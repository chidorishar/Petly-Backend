const service = require('../../services/notices');
const { BadRequest } = require('http-errors');
const { cloudinaryServices } = require('../../services');

const deleteOwnNotice = async (req, res) => {
  const id = req.params.id;
  const userId = req.user;

  const notice = await service.deleteOwnNotice(id, userId);
  if (!notice) {
    throw new BadRequest('Notice does not exist or has been already removed');
  }
  // delete image from cloudinary
  await cloudinaryServices.deleteImageFromCloudinary(
    notice.cloudinaryImagePublicId
  );

  res.json(notice);
};

module.exports = deleteOwnNotice;
