const service = require('../../services/notices');
const { utils } = require('../../services');

const getFavoriteNotices = async (req, res) => {
  const { page, limit } = req.query;
  const paginationOpts = utils.parsePagination(page, limit);

  const userId = req.user;

  const notices = await service.getFavoriteNotices(userId, paginationOpts);
  res.json(notices);
};

module.exports = getFavoriteNotices;
