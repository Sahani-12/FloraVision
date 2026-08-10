import Product from '../models/Product.js';

// @desc    Get all products with filtering, search, sorting & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      petFriendly,
      airPurifying,
      featured,
      sort,
      page = 1,
      limit = 20
    } = req.query;

    const query = {};

    // Search keyword
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category && category !== 'All') {
      query.$or = [
        { categoryName: { $regex: category, $options: 'i' } },
        { tags: { $regex: category, $options: 'i' } }
      ];
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Care guide toggles
    if (petFriendly === 'true') {
      query['careGuide.petFriendly'] = true;
    }
    if (airPurifying === 'true') {
      query['careGuide.airPurifying'] = true;
    }

    // Featured toggle
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Sorting
    let sortOption = '-createdAt';
    if (sort === 'price-asc') sortOption = 'price';
    if (sort === 'price-desc') sortOption = '-price';
    if (sort === 'rating') sortOption = '-ratingsAverage';
    if (sort === 'popular') sortOption = '-numReviews';

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      products
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug.toLowerCase() });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product (Admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, discountPrice, description, categoryName, stock, images, careGuide, variants, tags, isFeatured } = req.body;

    let slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existing = await Product.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const numericPrice = Number(price) || 499;
    const numericDiscount = discountPrice ? Number(discountPrice) : numericPrice;

    const product = await Product.create({
      name,
      slug,
      price: numericPrice,
      discountPrice: numericDiscount,
      description: description || 'Premium organic houseplant nurtured with care.',
      categoryName: categoryName || 'Indoor Plants',
      stock: stock !== undefined ? Number(stock) : 15,
      images: images && images.length && images[0] ? images : ['https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80'],
      careGuide: careGuide || { light: 'Bright Indirect Light', water: 'Once a week', petFriendly: true, airPurifying: true },
      variants: variants || [{ size: 'Medium', potColor: 'Terracotta', stock: 10 }],
      tags: tags || ['Indoor', 'Best Seller'],
      isFeatured: Boolean(isFeatured)
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (req.body.name) {
      req.body.slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.deleteOne();

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
