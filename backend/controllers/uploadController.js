import cloudinary from '../config/cloudinary.js';

// @desc    Upload image to Cloudinary CDN
// @route   POST /api/upload
// @access  Public / Admin
export const uploadImage = async (req, res, next) => {
  try {
    let fileStr = '';

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      fileStr = `data:${req.file.mimetype};base64,${b64}`;
    } else if (req.body.image) {
      fileStr = req.body.image;
    } else {
      return res.status(400).json({ success: false, message: 'Please provide an image file or base64 data string' });
    }

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: 'floravision/products',
      resource_type: 'auto'
    });

    res.status(200).json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Image upload failed'
    });
  }
};
