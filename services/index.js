const connectToMongo = require('./connectToMongoDB');
const { findServices } = require('./services');
const userServices = require('./users');
const upload = require('./upload');
const petServices = require('./pets');
const parseUserToken = require('./parseUserToken');
const parsePagination = require('./parsePagination');

module.exports = {
  connectToMongo,
  userServices,
  upload,
  petServices,
  findServices,
  parseUserToken,
  ...parsePagination,
};
