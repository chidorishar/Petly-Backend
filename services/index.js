const connectToMongo = require('./connectToMongoDB');
const { findServices } = require('./services');
const userServices = require('./users');
const upload = require('./upload');
const petServices = require('./pets');
const cloudinaryServices = require('./cloudinary');

module.exports = {
  connectToMongo,
  userServices,
  upload,
  petServices,
  findServices,
  cloudinaryServices,
};
