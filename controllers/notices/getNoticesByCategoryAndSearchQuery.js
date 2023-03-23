const { BadRequest } = require('http-errors');

const { utils } = require('../../services');
const service = require('../../services/notices');

const validCategoryAllUsers = ['sell', 'for-free', 'lost-found'];
const validCategoryLoggedUsers = ['favorite', 'own'];

const getNoticesByCategoryAndSearchQueryAndSearchQuery = async (req, res) => {
  const { category } = req.params;
  const { page, limit, searchQuery } = req.query;

  const isCategoryForAllUsers = validCategoryAllUsers.includes(category);
  const isCategoryForLoggedUsers = validCategoryLoggedUsers.includes(category);
  if (!isCategoryForAllUsers && !isCategoryForLoggedUsers) {
    throw new BadRequest(`Not found such category ${category}`);
  }

  // try to get User ID
  let userId = null;
  try {
    await utils.parseUserToken(req);
    userId = req.user;
  } catch (error) {}

  const paginationObj = utils.parsePagination(page, limit);
  const notices = await service.getNoticesByCategoryAndSearchQuery(
    category,
    searchQuery,
    userId,
    paginationObj
  );

  res.json(notices);
};

module.exports = getNoticesByCategoryAndSearchQueryAndSearchQuery;
