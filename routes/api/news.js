const express = require('express');

const ctrl = require('../../controllers/news');

const router = express.Router();

const { ctrlWrapper } = require('../../middlewares');

router.get('/', ctrlWrapper(ctrl.getAllNews));

module.exports = router;
