const service = require('../../services/notices');

const addNotice = async (req, res) => {
  // to do  обработка корректности даты
  const pathToImage = req.url;
  const imageCloudinaryID = req.public_id;
  const userId = req.user;
  const data = req.body;

  const notice = await service.addNotice(
    userId,
    data,
    pathToImage,
    imageCloudinaryID
  );

  res.status(201).json(notice);
};

module.exports = addNotice;
