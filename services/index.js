const connectToMongo = require('./connectToMongoDB');
const { findServices } = require('./services');
const userServices = require('./users');
const upload = require('./upload');

module.exports = { connectToMongo, userServices, upload, findServices };
