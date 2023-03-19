const express = require('express');
const router = express.Router();
const { ctrlWrapper, validateBody, userValidation } = require('../../middlewares');
const { getUserInformation, updateUser } = require('../../controllers/users');
const { userJoiEditSchema } = require('../../models');

router.get('/', userValidation, ctrlWrapper(getUserInformation));

router.patch(
  '/',
  userValidation,
  validateBody(userJoiEditSchema),
  ctrlWrapper(updateUser)
);

module.exports = { usersRouter: router };
