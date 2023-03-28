const service = require('../../services/notices');
const { checkCorrectDate } = require('../../services');
const { BadRequest } = require('http-errors');

const addNotice = async (req, res) => {
  const pathToImage = req.url;
  const imageCloudinaryID = req.public_id;
  const userId = req.user;
  const data = req.body;

  const { birthDate } = req.body;
  const isDateCorrect = checkCorrectDate(birthDate, 'pet');

  if (!isDateCorrect)
    throw new BadRequest(
      'The date must be no more than 15 years in the past, or later than today'
    );

  const notice = await service.addNotice(
    userId,
    data,
    pathToImage,
    imageCloudinaryID
  );

  res.status(201).json(notice);
};

module.exports = addNotice;
