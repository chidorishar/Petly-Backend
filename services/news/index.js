const getAllNews = require('./getAllNews');
const getNewsBySearchQuery = require('./getNewsBySearchQuery');

module.exports = {
  ...getAllNews,
  ...getNewsBySearchQuery,
};
