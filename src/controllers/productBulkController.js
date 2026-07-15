import fs from 'fs';
import { parse } from 'csv-parse';
import Product from '../models/productModel.js';

// @desc    Upload bulk products via CSV
// @route   POST /api/sellers/bulk-upload
// @access  Private (Seller/Admin)
export const bulkUploadProducts = async (req, res, next) => {
  if (!req.file) {
    res.status(400);
    return next(new Error('Please upload a CSV file'));
  }

  const results = [];
  const errors = [];
  
  // Read and parse the CSV stream
  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, skip_empty_lines: true, trim: true }))
    .on('data', (data) => {
      // Data mapping from CSV columns to Product schema
      try {
        const productData = {
          seller: req.user.id,
          name: data.Name || data.name,
          description: data.Description || data.description || 'No description provided',
          brand: data.Brand || data.brand || 'Generic',
          category: data.Category || data.category || 'Other',
          price: parseFloat(data.Price || data.price),
          countInStock: parseInt(data.Stock || data.countInStock, 10),
          image: data.ImageURL || data.image || 'https://via.placeholder.com/300?text=No+Image',
          images: [],
          numReviews: 0,
          rating: 0,
        };

        if (!productData.name || isNaN(productData.price) || isNaN(productData.countInStock)) {
          throw new Error('Missing or invalid required fields (Name, Price, Stock)');
        }

        results.push(productData);
      } catch (err) {
        errors.push({ row: data, error: err.message });
      }
    })
    .on('end', async () => {
      // Remove temp file
      fs.unlinkSync(req.file.path);

      if (results.length === 0) {
        res.status(400);
        return next(new Error('No valid products found in CSV. Ensure columns: Name, Price, Stock, Category, Brand, Description, ImageURL'));
      }

      try {
        // Insert all valid products
        await Product.insertMany(results);
        res.status(201).json({
          success: true,
          message: `${results.length} products added successfully.`,
          errors: errors.length > 0 ? errors : undefined,
        });
      } catch (dbErr) {
        next(dbErr);
      }
    })
    .on('error', (err) => {
      fs.unlinkSync(req.file.path);
      next(new Error(`CSV Parsing Error: ${err.message}`));
    });
};
