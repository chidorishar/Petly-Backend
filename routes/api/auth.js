const express = require('express');
const router = express.Router();

const {
  validateBody,
  ctrlWrapper,
  userValidation,
} = require('../../middlewares');
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

router.post('/logout', userValidation, ctrlWrapper(ctrl.logout));

router.get('/current', userValidation, ctrlWrapper(ctrl.getCurrentUser));

module.exports = router;
