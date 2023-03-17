const express = require('express');
const router = express.Router();

const { validation, ctrlWrapper } = require('../../middlewares');
const ctrl = require('../../controllers/auth');
const { userJoiRegisterSchema, userJoiLoginSchema } = require('../../models');

router.post(
  '/register',
  validation(userJoiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post('/login', validation(userJoiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
