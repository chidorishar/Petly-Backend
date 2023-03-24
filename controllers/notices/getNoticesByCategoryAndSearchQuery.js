const { BadRequest } = require('http-errors');

const { utils } = require('../../services');
const { noticesServices } = require('../../services');

const validCategories = ['sell', 'for-free', 'lost-found'];

const getNoticesByCategoryAndSearchQuery = async (req, res) => {
  const { category } = req.params;
  const { page, limit, searchQuery } = req.query;

  const isValidCategory = validCategories.includes(category);
  if (!isValidCategory) {
    throw new BadRequest(`Not found such category ${category}`);
  }

  // try to get User ID
  let userId = null;
  try {
    await utils.parseUserToken(req);
    userId = req.user;
  } catch (error) {}

  const paginationObj = utils.parsePagination(page, limit);
  const notices = await noticesServices.getNoticesByCategoryAndSearchQuery(
    category,
    searchQuery,
    userId,
    paginationObj
  );

  res.json(notices);
};

module.exports = getNoticesByCategoryAndSearchQuery;
