import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      isApproved: true
    }).sort('-createdAt');

    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment, images } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      userName: req.user.name,
      rating: Number(rating),
      comment,
      images: images || [],
      isVerifiedPurchase: true
    });

    // Update product rating statistics
    const reviews = await Review.find({ product: productId });
    const numReviews = reviews.length;
    const ratingsAverage = reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;

    product.numReviews = numReviews;
    product.ratingsAverage = Number(ratingsAverage.toFixed(1));
    await product.save();

    res.status(201).json({ success: true, review });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }

    await review.deleteOne();
    res.status(200).json({ success: true, message: 'Review removed' });
  } catch (error) {
    next(error);
  }
};
