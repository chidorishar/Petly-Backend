const connectToMongo = require('./connectToMongoDB');
const userServices = require('./users');
const petsServices = require('./pets');

module.exports = { connectToMongo, userServices, petsServices };
