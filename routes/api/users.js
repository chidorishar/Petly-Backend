const express = require('express');
const router = express.Router();
const { ctrlWrapper } = require('../../middlewares');
const { getUserInformation } = require('../../controllers/users');

const { userValidation } = require('../../middlewares');

router.get('/', userValidation, ctrlWrapper(getUserInformation));

module.exports = { usersRouter: router };
