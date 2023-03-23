const express = require('express');
const router = express.Router();
const {
  ctrlWrapper,
  userValidation,
  validateBody,
  uploadImageToCloudinary,
} = require('../../middlewares');
const { petJoiSchema } = require('../../models');
const { addPet, deletePetById } = require('../../controllers/pets');
const { upload } = require('../../services');
const {
  getUserInformation,
  updateUser,
  updateAvatar,
} = require('../../controllers/users');
const { userJoiEditSchema } = require('../../models');

router.get('/', userValidation, ctrlWrapper(getUserInformation));
router.post(
  '/pets',
  userValidation,
  upload.single('photo'),
  validateBody(petJoiSchema),
  uploadImageToCloudinary,
  ctrlWrapper(addPet)
);

router.patch(
  '/',
  userValidation,
  validateBody(userJoiEditSchema),
  ctrlWrapper(updateUser)
);

router.patch(
  '/avatar',
  userValidation,
  upload.single('photo'),
  ctrlWrapper(updateAvatar)
);

router.delete('/pets/:id', userValidation, ctrlWrapper(deletePetById));

module.exports = { usersRouter: router };
