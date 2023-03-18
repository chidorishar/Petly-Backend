const express = require('express');

const { auth, ctrlWrapper } = require('../../middlewares');
const { user: ctrl } = require('../../controllers');

const router = express.Router();

router.patch('/update/:userID', auth, ctrlWrapper(ctrl.updateUser));

module.exports = router;
