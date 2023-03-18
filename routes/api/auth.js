const express = require('express');
const router = express.Router();

const { validateBody, ctrlWrapper } = require('../../middlewares');
const ctrl = require('../../controllers/auth');
const { userJoiRegisterSchema, userJoiLoginSchema } = require('../../models');

router.post(
  '/register',
  validateBody(userJoiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.post(
  '/login',
  validateBody(userJoiLoginSchema),
  ctrlWrapper(ctrl.login)
);

module.exports = router;
