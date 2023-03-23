const { parseUserToken } = require('../../services');
const service = require('../../services/notices');
const { BadRequest } = require('http-errors');
const validCategory = ['sell', 'for-free', 'lost-found'];

const getNoticesByCategory = async (req, res) => {  
  const category = req.params.category;
  if (!validCategory.includes(category)) {
const { utils } = require('../../services');
    throw new BadRequest(`Not found such category ${category}`);
  }

  // try to get User ID
  let  userId = null;
  try {
    await parseUserToken(req);
    await utils.parseUserToken(req);
    userId = req.user;
  } catch (error) {  }

  let { page = 1, limit = 20 } = req.query;
  limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
  const skip = (parseInt(page) - 1) * limit;
 
  const notices = await service.getNoticesByCategory(category, {
    skip,
    limit,
  }, userId);
  res.json(notices);
};

module.exports = getNoticesByCategory;
