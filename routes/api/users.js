const express = require('express');
const router = express.Router();
const { ctrlWrapper, validateBody, userValidation } = require('../../middlewares');
const { getUserInformation } = require('../../controllers/users');
const { userJoiEditSchema } = require('../../models');

const ctrl = require('../../controllers/users');

router.get('/', userValidation, ctrlWrapper(getUserInformation));

router.patch(
  '/',
  userValidation,
  validateBody(userJoiEditSchema),
  ctrlWrapper(ctrl.updateUser)
);

module.exports = { usersRouter: router };
