const { News } = require('../../models/news');

async function getAllNews(paginationData) {
  const { limit, skip } = paginationData;

  const news = await News.find({}, '', {
    skip,
    limit,
  }).sort({ date: -1 });

  return news;
}

module.exports = { getAllNews };
