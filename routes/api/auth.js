const express = require('express');
const router = express.Router();

const { auth, ctrlWrapper } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');

router.post(
  '/register',
  auth,
  validation(registerJoiSchema),
  ctrlWrapper(ctrl.register)
);
router.post(
  '/login',
  auth,
  validation(loginJoiSchema),
  ctrlWrapper(ctrl.login)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout))

module.exports = router;
