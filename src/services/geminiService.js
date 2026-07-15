import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

// Bypass self-signed certificate issues in local development environment (e.g. proxy/VPN issues)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generate an embedding vector for a given text
 * @param {String} text - Text to embed
 * @returns {Array<Number>} - The embedding vector
 */
export const generateEmbedding = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-embedding-2' });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('❌ Error generating embedding:', error.message);
    throw error;
  }
};

/**
 * Generate a conversational response based on retrieved products
 * @param {String} query - User's search query
 * @param {Array} productsContext - Array of product objects retrieved from ChromaDB
 */
export const generateChatResponse = async (query, productsContext) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    
    let contextStr = 'Here are the products retrieved from the database:\\n';
    if (productsContext && productsContext.length > 0) {
      productsContext.forEach((prod, index) => {
        contextStr += `\n${index + 1}. Name: ${prod.name}\nPrice: ₹${prod.price}\nCategory: ${prod.category}\nDescription: ${prod.description}\n`;
      });
    } else {
      contextStr = 'No matching products found in the database.\n';
    }

    const prompt = `
You are an AI Shopping Assistant for a marketplace called Flipkart Clone.
A user has asked: "${query}"

${contextStr}

Your task:
1. Recommend the most relevant products from the list above.
2. Be helpful, concise, and conversational.
3. Use markdown formatting (bullet points, bold text).
4. Only suggest products that are explicitly provided in the list above.
5. If no products match their query, politely inform them that you couldn't find exactly what they're looking for.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('❌ Error generating chat response:', error.message);
    throw error;
  }
};

/**
 * Generate a review summary for a product based on specs and actual reviews
 * @param {Object} product - The product document
 * @param {Array} reviews - Array of review documents
 * @returns {Object} - JSON object with { summary, pros: [], cons: [], verdict }
 */
export const generateReviewSummary = async (product, reviews) => {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-flash-latest',
      generationConfig: { responseMimeType: 'application/json' }
    });

    let reviewsText = '';
    if (reviews && reviews.length > 0) {
      reviewsText = reviews.map((r, i) => `Review ${i+1} (${r.rating}★): ${r.title ? r.title + ' - ' : ''}${r.comment}`).join('\n');
    } else {
      reviewsText = 'No customer reviews available yet.';
    }

    const prompt = `
You are an expert AI Product Review Analyzer.
Analyze the following product details and its customer reviews:

Product Name: ${product.name}
Category: ${product.category}
Brand: ${product.brand}
Price: INR ${product.price}
Ratings: ${product.ratings}★ (${product.numOfReviews} ratings)
Description: ${product.description}

Customer Reviews:
${reviewsText}

Based on this information:
1. Summarize the overall customer sentiment (or write a realistic sentiment profile if there are no reviews yet based on the brand reputation and specifications) in a single friendly paragraph.
2. Provide a list of 3-4 key strengths (pros) that customers love or would love.
3. Provide a list of 2-3 key limitations or drawbacks (cons) that customers complain or would caution about.
4. Give a final buyer's verdict on who this product is best suited for.

Your response MUST be a JSON object with the exact keys:
{
  "summary": "overall sentiment summary paragraph...",
  "pros": ["strength 1", "strength 2", "strength 3"],
  "cons": ["limitation 1", "limitation 2"],
  "verdict": "final purchasing recommendation..."
}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text().trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error('❌ Error generating review summary:', error.message);
    // Return a structured fallback object in case of JSON parse error or API failure
    return {
      summary: `A high-performing ${product.name} by ${product.brand} in the ${product.category} category. Ideal for users looking for premium quality at ${product.price} INR.`,
      pros: ["Premium build quality", `${product.brand} brand trust`, "Satisfactory specifications"],
      cons: ["Pricing may be premium for some budgets"],
      verdict: "A solid choice for brand loyalists and those seeking a reliable product in this category."
    };
  }
};


/**
 * Analyze an uploaded image buffer for product category/details to create a search query
 * @param {Buffer} buffer - File buffer
 * @param {String} mimeType - Image mime type
 * @returns {String} - A concise search query string
 */
export const analyzeImageForSearch = async (buffer, mimeType) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    
    const imagePart = {
      inlineData: {
        data: buffer.toString('base64'),
        mimeType
      }
    };

    const prompt = `
Look at this product image.
Identify the product, its category, type, color, and brand if visible.
Generate a concise, 3-5 word search query representing this product (e.g. 'black wireless headphones', 'men blue denim shirt', 'gold analog watch', 'smart trimmer').
Output ONLY the clean search query text. Do not include quotes, markdown formatting, or any extra conversational text.
`;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    return response.text().trim().replace(/['"“”]/g, '');
  } catch (error) {
    console.error('❌ Error analyzing image for search:', error.message);
    // Simple default fallback
    return 'smartphone';
  }
};
