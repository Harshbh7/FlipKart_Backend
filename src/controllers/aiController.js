import Product from '../models/productModel.js';
import Review from '../models/reviewModel.js';
import { upsertProductToChroma, searchProductsInChroma } from '../services/chromaService.js';
import { generateEmbedding, generateChatResponse, generateReviewSummary, analyzeImageForSearch } from '../services/geminiService.js';

// @desc    Seed existing products to ChromaDB
// @route   POST /api/ai/seed
// @access  Public (for development)
export const seedProductsToChroma = async (req, res, next) => {
  try {
    const products = await Product.find({});
    
    res.status(200).json({
      success: true,
      message: `Seeding ${products.length} products to ChromaDB started in the background. This will take a few minutes. Check server logs for progress.`,
    });

    // Run in background to avoid blocking the request and to handle rate limits
    (async () => {
      let successCount = 0;
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        try {
          const textToEmbed = `${product.name}. ${product.description}. Brand: ${product.brand}. Category: ${product.category}. Price: ${product.price}.`;
          const embedding = await generateEmbedding(textToEmbed);
          await upsertProductToChroma(product, embedding);
          successCount++;
          
          // Delay to respect Gemini API rate limits (1 second between requests)
          await new Promise(r => setTimeout(r, 1000));
        } catch (err) {
          console.error(`Failed to seed product ${product._id}:`, err.message);
          // Wait longer if we hit a rate limit error before trying the next one
          if (err.message.includes('429')) {
             await new Promise(r => setTimeout(r, 10000));
          } else {
             await new Promise(r => setTimeout(r, 2000));
          }
        }
      }
      console.log(`✅ Background Seeding Complete! Successfully seeded ${successCount} out of ${products.length} products to ChromaDB.`);
    })();

  } catch (error) {
    next(error);
  }
};

// @desc    Chat with AI Shopping Assistant
// @route   POST /api/ai/chat
// @access  Public
export const chatWithAI = async (req, res, next) => {
  try {
    const message = req.body.message || req.body.query;
    
    if (!message) {
      res.status(400);
      return next(new Error('Please provide a message or query'));
    }

    // 1. Embed the user's query
    const queryEmbedding = await generateEmbedding(message);

    // 2. Search ChromaDB for relevant products (top 5)
    const searchResults = await searchProductsInChroma(queryEmbedding, 5);
    
    let productsContext = [];
    if (searchResults && searchResults.metadatas && searchResults.metadatas[0] && searchResults.ids && searchResults.ids[0]) {
      productsContext = searchResults.metadatas[0].map((metadata, idx) => ({
        ...metadata,
        _id: searchResults.ids[0][idx]
      }));
    }

    // 3. Generate response using Gemini
    const aiResponse = await generateChatResponse(message, productsContext);

    res.status(200).json({
      success: true,
      response: aiResponse,
      reply: aiResponse, // frontend AIAssistant expects data.reply
      message: aiResponse, // frontend Orders expects data.message
      products: productsContext // Also return the products so the UI can display cards if wanted
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI review summary for a product
// @route   GET /api/ai/review-summary/:productId
// @access  Public
export const getProductReviewSummary = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    // Get actual reviews from DB
    const reviews = await Review.find({ product: productId });

    // Generate AI review summary (simulated if reviews are empty)
    const summary = await generateReviewSummary(product, reviews);

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Perform AI visual search (Search by Image)
// @route   POST /api/ai/visual-search
// @access  Public
export const visualSearchProducts = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      return next(new Error('Please upload an image file'));
    }

    // 1. Analyze the image with Gemini multimodal vision to get the text search phrase
    const identifiedSearchQuery = await analyzeImageForSearch(req.file.buffer, req.file.mimetype);
    console.log(`🤖 AI Visual Search identified query: "${identifiedSearchQuery}"`);

    // 2. Perform the semantic + regex hybrid search using the identified search query
    const query = {};
    const queryEmbedding = await generateEmbedding(identifiedSearchQuery);
    
    // Search ChromaDB for the closest 20 product matches
    const searchResults = await searchProductsInChroma(queryEmbedding, 20);
    
    const buildRegexConditions = (searchStr) => {
      const conditions = [
        { name: { $regex: searchStr, $options: 'i' } },
        { brand: { $regex: searchStr, $options: 'i' } },
        { category: { $regex: searchStr, $options: 'i' } },
        { description: { $regex: searchStr, $options: 'i' } },
      ];

      // Split searchStr into individual keywords
      const keywords = searchStr
        .split(/\s+/)
        .map(w => w.replace(/[^a-zA-Z0-9]/g, '').trim())
        .filter(w => w.length > 2); // Ignore very short words like 'a', 'in', 'of', 'on', etc.

      keywords.forEach(keyword => {
        const regexPattern = `\\b${keyword}\\b`;
        conditions.push({ name: { $regex: regexPattern, $options: 'i' } });
        conditions.push({ brand: { $regex: regexPattern, $options: 'i' } });
        conditions.push({ category: { $regex: regexPattern, $options: 'i' } });
        conditions.push({ description: { $regex: regexPattern, $options: 'i' } });
      });

      const lowerSearch = searchStr.toLowerCase();
      
      // Match synonyms to category
      const categorySynonyms = {
        'Fashion': ['fashion', 'clothes', 'clothing', 'apparel', 'wear', 'garment', 'dress', 'shirt', 'jeans', 'tshirt', 't-shirt', 'shoe', 'shoes', 'sneaker', 'sneakers'],
        'Mobiles': ['mobile', 'mobiles', 'phone', 'phones', 'smartphone', 'smartphones', 'cellphone', 'cellphones', 'iphone', 'iphones'],
        'Electronics': ['electronics', 'electronic', 'laptop', 'laptops', 'computer', 'computers', 'earphone', 'earphones', 'headphone', 'headphones', 'headset', 'headsets', 'soundbar', 'soundbars', 'speaker', 'speakers', 'tv', 'tvs', 'television', 'televisions'],
        'Home': ['home', 'furniture', 'kettle', 'kettles', 'decor', 'bedsheet', 'bedsheets', 'kitchen']
      };

      Object.entries(categorySynonyms).forEach(([cat, synonyms]) => {
        const matchesSynonym = synonyms.some(syn => 
          lowerSearch.includes(syn) || 
          lowerSearch.split(/\s+/).some(word => word.replace(/[^a-zA-Z0-9]/g, '') === syn)
        );
        if (matchesSynonym) {
          conditions.push({ category: cat });
        }
      });

      const isWomen = lowerSearch.includes('women') || lowerSearch.includes('woman') || lowerSearch.includes('lady') || lowerSearch.includes('girl');
      const isMen = (lowerSearch.includes('men') || lowerSearch.includes('man') || lowerSearch.includes('boy')) && !lowerSearch.includes('women') && !lowerSearch.includes('woman');

      if (isMen) {
        conditions.push({
          $and: [
            { category: 'Fashion' },
            { description: { $regex: "\\b(men's|formal|jean|shirt|blazer|t-shirt|trouser|polo)s?\\b", $options: 'i' } }
          ]
        });
      }
      if (isWomen) {
        conditions.push({
          $and: [
            { category: { $regex: "Fashion|Bags|Footwear", $options: 'i' } },
            { description: { $regex: "\\b(women's|kurta|saree|midi|dress|top|bag|heel|wedge|flat)s?\\b", $options: 'i' } }
          ]
        });
      }
      return conditions;
    };

    if (searchResults && searchResults.ids && searchResults.ids[0] && searchResults.ids[0].length > 0) {
      const threshold = 0.80;
      const filteredIds = [];
      
      for (let i = 0; i < searchResults.ids[0].length; i++) {
        const distance = (searchResults.distances && searchResults.distances[0]) ? searchResults.distances[0][i] : 0;
        if (distance <= threshold) {
          filteredIds.push(searchResults.ids[0][i]);
        }
      }

      const regexConditions = buildRegexConditions(identifiedSearchQuery);

      if (filteredIds.length > 0) {
        query.$or = [
          { _id: { $in: filteredIds } },
          ...regexConditions
        ];
      } else {
        query.$or = regexConditions;
      }
    } else {
      query.$or = buildRegexConditions(identifiedSearchQuery);
    }

    // Fetch the matched products from MongoDB
    const products = await Product.find(query).limit(12);

    res.status(200).json({
      success: true,
      query: identifiedSearchQuery,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};
