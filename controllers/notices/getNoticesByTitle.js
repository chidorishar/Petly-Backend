const { parseUserToken } = require('../../services');
const service = require('../../services/notices');
const { BadRequest } = require('http-errors');
const validCategory = ['sell', 'for-free', 'lost-found'];

const getNoticesByTitle = async (req, res) => {  
  const {query, category } = req.params;
  if (!query) {
    throw new BadRequest(`Query is empty`);
  }
  // const category = req.params.category;
  if (!validCategory.includes(category)) {
    throw new BadRequest(`Not found such category ${category}`);
  }

  // try to get User ID
  let  userId = null;
  try {
    await parseUserToken(req);
    userId = req.user;
  } catch (error) {  }

  let { page = 1, limit = 20 } = req.query;
  limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
  const skip = (parseInt(page) - 1) * limit;
 
  const notices = await service.getNoticesByTitle(category, query, {
    skip,
    limit,
  }, userId, );
  res.json(notices);
};

module.exports = getNoticesByTitle;
