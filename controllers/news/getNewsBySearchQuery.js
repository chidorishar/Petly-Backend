const { newsServices } = require('../../services');

const getNewsBySearchQuery = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const { searchQuery } = req.params;

  const skip = (page - 1) * limit;
  const news = await newsServices.getNewsBySearchQuery(searchQuery, {
    skip,
    limit,
  });

  res.json({
    message: 'success',
    result: news,
  });
};

module.exports = { getNewsBySearchQuery };
