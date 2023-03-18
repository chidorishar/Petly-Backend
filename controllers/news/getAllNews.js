const { News } = require('../../models/news');

const getAllNews = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const news = await News.find({}, '', {
    skip,
    limit,
  }).sort({ date: -1 });

  res.json({
    message: 'success',
    news,
  });
};

module.exports = getAllNews;
