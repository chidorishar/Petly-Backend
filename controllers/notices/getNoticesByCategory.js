const service = require('../../services/notices');
const { BadRequest } = require('http-errors');

const getNoticesByCategory = async (req, res) => {
  let { page = 1, limit = 20 } = req.query;
  limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
  const skip = (parseInt(page) - 1) * limit;

    const category = req.params.category;
  
  // todo возможно сделать проверку в мидлваре
  if (
    category !== 'sell' &&
    category !== 'for-free' &&
    category !== 'lost-found'
  ) {
    throw new BadRequest(`Not found such category ${category}`);
  }
    const notices = await service.getNoticesByCategory(category, {
      skip,
      limit,
    });
    res.json(notices);  
};

module.exports = getNoticesByCategory;
