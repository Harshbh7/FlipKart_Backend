import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/productModel.js';
import { generateEmbedding } from '../src/services/geminiService.js';
import { upsertProductToChroma, getProductCollection } from '../src/services/chromaService.js';
import { CloudClient } from 'chromadb';

dotenv.config();

const chromaClient = new CloudClient({
  tenant: process.env.CHROMADB_TENANT,
  database: process.env.CHROMADB_DATABASE,
  apiKey: process.env.CHROMADB_API_KEY
});

const withTimeout = (promise, ms) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('Request Timeout'));
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timeoutId));
};

const syncChroma = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    try {
      await chromaClient.deleteCollection({ name: 'products' });
      console.log('🧹 Cleared old ChromaDB collection.');
    } catch(err) {
      console.log('No existing ChromaDB collection to clear.');
    }

    const products = await Product.find({});
    console.log(`Found ${products.length} products. Syncing to ChromaDB...`);

    let success = 0;
    let failed = 0;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      try {
        const textToEmbed = `${product.name}. ${product.description}. Brand: ${product.brand}. Category: ${product.category}. Price: ${product.price}.`;
        
        // Generate embedding with a 12s timeout
        const embedding = await withTimeout(generateEmbedding(textToEmbed), 12000);
        
        // Sync to Chroma with a 15s timeout
        await withTimeout(upsertProductToChroma(product, embedding), 15000);
        
        success++;
        console.log(`[${i + 1}/${products.length}] Synced: ${product.name}`);
        
        // Add a small delay to avoid rate limits with Gemini API
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch (err) {
        console.error(`❌ Failed to sync: ${product.name} -`, err.message);
        failed++;
      }
    }

    console.log(`\n🎉 Sync Complete! Success: ${success}, Failed: ${failed}`);
  } catch (error) {
    console.error('Error during sync:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

syncChroma();
