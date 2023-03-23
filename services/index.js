const connectToMongo = require('./connectToMongoDB');
const { findServices } = require('./services');
const userServices = require('./users');
const upload = require('./upload');
const petServices = require('./pets');
const cloudinaryServices = require('./cloudinary');
const newsServices = require('./news');

module.exports = {
  connectToMongo,
  userServices,
  upload,
  petServices,
  findServices,
  cloudinaryServices,
  newsServices,
};
