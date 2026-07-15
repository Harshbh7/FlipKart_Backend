import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';

// Helper function to recalculate and update product ratings
const updateProductRatingStats = async (productId) => {
  const reviews = await Review.find({ product: productId });
  
  const numOfReviews = reviews.length;
  let ratings = 0;
  
  if (numOfReviews > 0) {
    const sum = reviews.reduce((acc, rev) => acc + rev.rating, 0);
    // Round to 1 decimal place
    ratings = Math.round((sum / numOfReviews) * 10) / 10;
  }

  await Product.findByIdAndUpdate(productId, {
    ratings,
    numOfReviews,
  });
};

// @desc    Create or update a product review
// @route   POST /api/reviews/:productId
// @access  Private
export const createProductReview = async (req, res, next) => {
  const { rating, comment, title } = req.body;
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    // Check if review already exists for this user
    let review = await Review.findOne({ user: req.user.id, product: productId });

    if (review) {
      // Update existing review
      review.rating = Number(rating);
      review.comment = comment;
      review.title = title || '';
      await review.save();
    } else {
      // Create new review
      review = await Review.create({
        user: req.user.id,
        product: productId,
        rating: Number(rating),
        comment,
        title: title || '',
      });
    }

    // Recalculate average rating
    await updateProductRatingStats(productId);

    res.status(200).json({
      success: true,
      message: 'Review submitted successfully',
      review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product review
// @route   DELETE /api/reviews/:productId
// @access  Private
export const deleteReview = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const review = await Review.findOne({ user: req.user.id, product: productId });

    if (!review) {
      res.status(404);
      return next(new Error('Review not found'));
    }

    await review.deleteOne();

    // Recalculate average rating
    await updateProductRatingStats(productId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};
