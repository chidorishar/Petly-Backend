const service = require('../../services/notices');
const { BadRequest } = require('http-errors');

const deleteNoticeFromFavorites = async (req, res) => {
  const id = req.params.id;
  const userId = req.user;

  const isRemoved = await service.deleteNoticeFromFavorites(id, userId);
  if (!isRemoved) {
    throw new BadRequest('Notice does not exist or has been already removed');
  }

  res.status(204).end();
};

module.exports = deleteNoticeFromFavorites;
