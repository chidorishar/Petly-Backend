const connectToMongo = require('./connectToMongoDB');
const userServices = require('./users');
const upload = require('./upload');
module.exports = { connectToMongo, userServices, upload };
