const { News } = require('../../models/news');

async function getNewsBySearchQuery(searchString, paginationData) {
  const { limit, skip } = paginationData;

  const news = await News.find(
    {
      $or: [
        { title: { $regex: searchString, $options: 'i' } }, // $options: 'i' позволяет игнорировать регистр при поиске
        { description: { $regex: searchString, $options: 'i' } },
      ],
    },
    '',
    {
      skip,
      limit,
    }
  ).sort({ date: -1 });

  return news;
}

module.exports = { getNewsBySearchQuery };
