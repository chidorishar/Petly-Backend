const express = require('express');
const router = express.Router();

const {
  validateBody,
  ctrlWrapper,
  userValidation,
  uploadImageToCloudinary,
} = require('../../middlewares');
const { upload } = require('../../services');
const ctrl = require('../../controllers/auth');
const { userJoiRegisterSchema, userJoiLoginSchema } = require('../../models');

router.post(
  '/register',
  upload.single('photo'),
  validateBody(userJoiRegisterSchema),
  uploadImageToCloudinary,
  ctrlWrapper(ctrl.register)
);
router.post(
  '/login',
  validateBody(userJoiLoginSchema),
  ctrlWrapper(ctrl.login)
);

router.post('/logout', userValidation, ctrlWrapper(ctrl.logout));

module.exports = router;
