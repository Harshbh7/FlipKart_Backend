import Product from '../models/productModel.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinaryService.js';
import { upsertProductToChroma, deleteProductFromChroma, searchProductsInChroma } from '../services/chromaService.js';
import { generateEmbedding } from '../services/geminiService.js';

// @desc    Get all products (with filters, sorting, search & pagination)
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { search, category, brand, minPrice, maxPrice, rating, sort, page = 1, limit = 9 } = req.query;

    const query = {};

    // 1. Search Query (Semantic Search via ChromaDB)
    if (search) {
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

      try {
        // Embed the user's search text
        const queryEmbedding = await generateEmbedding(search);
        
        // Search ChromaDB for the closest 20 product matches
        const searchResults = await searchProductsInChroma(queryEmbedding, 20);

        if (searchResults && searchResults.ids && searchResults.ids[0] && searchResults.ids[0].length > 0) {
          // Apply a distance threshold to filter out irrelevant filler items
          // L2 distance of <= 0.80 is the sweet spot for Gemini embeddings.
          const threshold = 0.80;
          const filteredIds = [];
          
          for (let i = 0; i < searchResults.ids[0].length; i++) {
            const distance = (searchResults.distances && searchResults.distances[0]) ? searchResults.distances[0][i] : 0;
            if (distance <= threshold) {
              filteredIds.push(searchResults.ids[0][i]);
            }
          }

          const regexConditions = buildRegexConditions(search);

          if (filteredIds.length > 0) {
            // Combine semantic match IDs and regex text matches
            query.$or = [
              { _id: { $in: filteredIds } },
              ...regexConditions
            ];
          } else {
            // Fallback to regex if no semantic matches pass the similarity threshold
            query.$or = regexConditions;
          }
        } else {
          // Fallback to regex if ChromaDB returns no results
          query.$or = buildRegexConditions(search);
        }
      } catch (err) {
        console.error('Semantic search failed, falling back to regex:', err.message);
        query.$or = buildRegexConditions(search);
      }
    }

    // 2. Category Filter
    if (category) {
      query.category = String(category);
    }

    // 3. Brand Filter (Supports single string or array of brands)
    if (brand) {
      if (Array.isArray(brand)) {
        query.brand = { $in: brand.map(String) };
      } else {
        query.brand = String(brand);
      }
    }

    // 4. Price Bounding Filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 5. Rating Threshold Filter
    if (rating) {
      query.ratings = { $gte: Number(rating) };
    }

    // 6. Sorting Configuration
    let sortOptions = { createdAt: -1 }; // Default: Newest first
    if (sort) {
      if (sort === 'price_asc') {
        sortOptions = { price: 1 };
      } else if (sort === 'price_desc') {
        sortOptions = { price: -1 };
      } else if (sort === 'rating') {
        sortOptions = { ratings: -1 };
      }
    }

    // 7. Pagination
    const currentPage = Number(page);
    const limitCount = Number(limit);
    const skipCount = (currentPage - 1) * limitCount;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skipCount)
      .limit(limitCount);

    // Compute unique brands matching the current query filters (excluding brand filter itself)
    const brandQuery = { ...query };
    delete brandQuery.brand;
    const availableBrands = (await Product.distinct('brand', brandQuery)).sort();

    res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitCount),
      currentPage,
      brands: availableBrands,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product details
// @route   GET /api/products/:id
// @access  Public
export const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name email businessName');
    
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new product (Seller or Admin only)
// @route   POST /api/products
// @access  Private (Seller/Admin)
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, discount, brand, category, stock } = req.body;

    if (!req.files || req.files.length === 0) {
      res.status(400);
      return next(new Error('Please upload at least one image'));
    }

    // Upload images to Cloudinary in parallel
    const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
    const uploadResults = await Promise.all(uploadPromises);

    const images = uploadResults.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      discount: Number(discount || 0),
      brand,
      category,
      images,
      stock: Number(stock || 0),
      seller: req.user.id,
    });

    // Sync to ChromaDB
    try {
      const textToEmbed = `${product.name}. ${product.description}. Brand: ${product.brand}. Category: ${product.category}. Price: ${product.price}.`;
      const embedding = await generateEmbedding(textToEmbed);
      await upsertProductToChroma(product, embedding);
    } catch (err) {
      console.error('Failed to sync new product to ChromaDB:', err.message);
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product (Seller who owns it or Admin only)
// @route   PUT /api/products/:id
// @access  Private (Seller/Admin)
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    // Verify ownership: must be the seller of the product or admin
    if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      return next(new Error('You are not authorized to update this product'));
    }

    // Destructure properties from body
    const { name, description, price, discount, brand, category, stock, removeImages } = req.body;

    // Handle image removal if specified (removeImages can be a string or array of public_ids)
    if (removeImages) {
      const imagesToDelete = Array.isArray(removeImages) ? removeImages : [removeImages];
      for (const publicId of imagesToDelete) {
        await deleteFromCloudinary(publicId);
        product.images = product.images.filter((img) => img.public_id !== publicId);
      }
    }

    // Handle new image uploads if specified
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const uploadResults = await Promise.all(uploadPromises);

      const newImages = uploadResults.map((result) => ({
        public_id: result.public_id,
        url: result.secure_url,
      }));

      product.images = [...product.images, ...newImages];
    }

    // Update textual properties
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = Number(price);
    if (discount !== undefined) product.discount = Number(discount);
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = Number(stock);

    const updatedProduct = await product.save();

    // Sync to ChromaDB
    try {
      const textToEmbed = `${updatedProduct.name}. ${updatedProduct.description}. Brand: ${updatedProduct.brand}. Category: ${updatedProduct.category}. Price: ${updatedProduct.price}.`;
      const embedding = await generateEmbedding(textToEmbed);
      await upsertProductToChroma(updatedProduct, embedding);
    } catch (err) {
      console.error('Failed to sync updated product to ChromaDB:', err.message);
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product (Seller who owns it or Admin only)
// @route   DELETE /api/products/:id
// @access  Private (Seller/Admin)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    // Verify ownership: must be the seller of the product or admin
    if (product.seller.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      return next(new Error('You are not authorized to delete this product'));
    }

    // Delete associated images from Cloudinary
    for (const image of product.images) {
      await deleteFromCloudinary(image.public_id);
    }

    await product.deleteOne();

    // Remove from ChromaDB
    try {
      await deleteProductFromChroma(product._id.toString());
    } catch (err) {
      console.error('Failed to delete product from ChromaDB:', err.message);
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
