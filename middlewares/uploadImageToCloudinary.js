const cloudinary = require('cloudinary').v2;
const { BadRequest, InternalServerError } = require('http-errors');
const fs = require('fs/promises');
require('dotenv').config();

const uploadImageToCloudinary = async (req, res, next) => {
  if (req.method === 'options') {
    next();
  }
  try {
    if (!req.file) {
      throw BadRequest('Avatar is required');
    }
    const { path: tempUpload } = req.file;
    const { url, public_id } = await cloudinary.uploader.upload(tempUpload, {
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
    req.public_id = public_id;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = uploadImageToCloudinary;
