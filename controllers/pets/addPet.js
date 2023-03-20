const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const { BadRequest, InternalServerError } = require('http-errors');
require('dotenv').config();

const { Pet } = require('../../models');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const addPet = async (req, res) => {
  const _id = req.user;
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

  const newPet = await Pet.create({
    ...req.body,
    photo: url,
    owner: _id,
  });
  // check is document creation in DB successful
  if (!newPet) {
    throw InternalServerError('Failed to save your pet');
  }

  res.status(201).json({
    message: 'success',
    pet: newPet,
  });
};

module.exports = addPet;
