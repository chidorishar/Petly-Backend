const express = require('express');
const router = express.Router();
const { getUserInformation } = require('../../controllers/users');

const { userValidation } = require('../../middlewares');

router.get('/', userValidation, getUserInformation);

module.exports = { usersRouter: router };
