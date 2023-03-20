const express = require('express');
const router = express.Router();
const {
  ctrlWrapper,
  userValidation,
  validateBody,
} = require('../../middlewares');
const { getUserInformation } = require('../../controllers/users');
const { petJoiSchema } = require('../../models');
const { addPet } = require('../../controllers/pets');
const { upload } = require('../../services');

router.get('/', userValidation, ctrlWrapper(getUserInformation));
router.post(
  '/pets',
  userValidation,
  upload.single('photo'),
  validateBody(petJoiSchema),
  ctrlWrapper(addPet)
);

module.exports = { usersRouter: router };
