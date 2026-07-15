import { CloudClient } from 'chromadb';
import dotenv from 'dotenv';
dotenv.config();

// Bypass self-signed certificate issues in local development environment (e.g. proxy/VPN issues)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const chromaClient = new CloudClient({
  tenant: process.env.CHROMADB_TENANT,
  database: process.env.CHROMADB_DATABASE,
  apiKey: process.env.CHROMADB_API_KEY
});

// Create or get the products collection
export const getProductCollection = async () => {
  return await chromaClient.getOrCreateCollection({
    name: 'products',
    embeddingFunction: { generate: (texts) => new Array(texts.length).fill([]) }
  });
};

/**
 * Upsert a single product to ChromaDB
 * @param {Object} product - Product document from MongoDB
 * @param {Array<Number>} embedding - Vector array representing the product
 */
export const upsertProductToChroma = async (product, embedding) => {
  try {
    const collection = await getProductCollection();
    await collection.upsert({
      ids: [product._id.toString()],
      embeddings: [embedding],
      metadatas: [{
        name: product.name,
        price: product.price,
        category: product.category,
        brand: product.brand,
        image: product.images && product.images.length > 0 ? product.images[0].url : ''
      }],
      documents: [product.description]
    });
    console.log(`✅ Synced product to ChromaDB: ${product.name}`);
  } catch (error) {
    console.error('❌ Error syncing to ChromaDB:', error.message);
    throw error;
  }
};

/**
 * Delete a product from ChromaDB
 * @param {String} productId - MongoDB Product ID
 */
export const deleteProductFromChroma = async (productId) => {
  try {
    const collection = await getProductCollection();
    await collection.delete({ ids: [productId] });
    console.log(`🗑️ Deleted product from ChromaDB: ${productId}`);
  } catch (error) {
    console.error('❌ Error deleting from ChromaDB:', error.message);
  }
};

/**
 * Search ChromaDB for closest matches
 * @param {Array<Number>} queryEmbedding - Vector of the user's search query
 * @param {Number} nResults - Number of results to return
 */
export const searchProductsInChroma = async (queryEmbedding, nResults = 5) => {
  try {
    const collection = await getProductCollection();
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults
    });
    return results;
  } catch (error) {
    console.error('❌ Error querying ChromaDB:', error.message);
    return null;
  }
};
