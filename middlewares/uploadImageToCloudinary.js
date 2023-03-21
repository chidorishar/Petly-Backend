const cloudinary = require('cloudinary').v2;
const { BadRequest, InternalServerError } = require('http-errors');
const fs = require('fs/promises');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (req, res, next) => {
  if (req.method === 'options') {
    next();
  }
  try {
    if (!req.file) {
      throw BadRequest('Avatar is required');
    }
    const { path: tempUpload } = req.file;
    const { url } = await cloudinary.uploader.upload(tempUpload, {
      width: 182,
      height: 182,
      crop: 'fill',
    });

    // delete temp file
    await fs.unlink(req.file.path);
    // check is upload successful
    if (!url) {
      throw InternalServerError('Failed to upload your image');
    }

    req.url = url;
    next();
  } catch (error) {
    return next(error);
  }
};
module.exports = uploadImageToCloudinary;
