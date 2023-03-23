const cloudinary = require('cloudinary').v2;

async function deleteImageFromCloudinary(imageIdToDelete) {
  const imgDelRes = await cloudinary.uploader.destroy(imageIdToDelete, {
    invalidate: true,
  });

  return imgDelRes;
}

module.exports = deleteImageFromCloudinary;
