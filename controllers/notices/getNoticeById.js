const { parseUserToken } = require('../../services/utils');
const service = require('../../services/notices');

const getNoticeById = async (req, res) => {
  const id = req.params.id;

  try {
    await parseUserToken(req);
  } catch (error) {}

  const notice = await service.getNoticeById(id, req.user);
  res.json(notice);
};

module.exports = getNoticeById;
