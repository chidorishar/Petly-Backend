const { newsServices } = require('../../services');

const getAllNews = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const news = await newsServices.getAllNews({ skip, limit });

  res.json({
    message: 'success',
    result: news,
  });
};

module.exports = getAllNews;
