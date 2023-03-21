const cloudinary = require('cloudinary').v2;
const fs = require('fs/promises');
const { BadRequest, InternalServerError } = require('http-errors');
require('dotenv').config();

const { petServices, userServices } = require('../../services');

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

  const newPet = await petServices.createPet({
    ...req.body,
    photo: url,
    owner: _id,
  });
  await userServices.addPetForUserWithId(_id, newPet._id);

  res.status(201).json({
    message: 'success',
    pet: newPet,
  });
};

module.exports = addPet;
