const connectToMongo = require('./connectToMongoDB');
const { findServices } = require('./services');
const userServices = require('./users');
const upload = require('./upload');
const petServices = require('./pets');

module.exports = {
  connectToMongo,
  userServices,
  upload,
  petServices,
  findServices,
};
