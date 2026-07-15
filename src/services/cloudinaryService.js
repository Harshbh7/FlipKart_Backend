import cloudinary from '../config/cloudinary.js';

/**
 * Uploads a file buffer directly to Cloudinary
 * @param {Buffer} fileBuffer - File buffer from Multer memory storage
 * @returns {Promise<{public_id: string, secure_url: string}>}
 */
export const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    // Check if credentials are placeholder
    const isMock = 
      !process.env.CLOUDINARY_API_KEY ||
      process.env.CLOUDINARY_API_KEY.startsWith('your_') ||
      process.env.CLOUDINARY_CLOUD_NAME === 'your_cloudinary_cloud_name';

    if (isMock) {
      console.log('☁️ [CLOUDINARY MOCK UPLOAD] Mocking upload buffer to Unsplash placeholder');
      // Return a random placeholder product image for high fidelity
      const mockImages = [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800',
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
      ];
      const randomIndex = Math.floor(Math.random() * mockImages.length);
      return resolve({
        public_id: `mock_public_id_${Date.now()}`,
        secure_url: mockImages[randomIndex],
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'flipkart_clone_products' },
      (error, result) => {
        if (error) {
          console.error('Cloudinary stream upload error:', error);
          return reject(error);
        }
        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
        });
      }
    );
    
    uploadStream.end(fileBuffer);
  });
};

/**
 * Deletes a product image from Cloudinary
 * @param {string} publicId - Cloudinary public asset ID
 * @returns {Promise<any>}
 */
export const deleteFromCloudinary = async (publicId) => {
  if (publicId.startsWith('mock_')) {
    console.log(`☁️ [CLOUDINARY MOCK DELETE] Destroyed mock asset: ${publicId}`);
    return { result: 'ok' };
  }
  
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary asset destruction error:', error);
    throw error;
  }
};
