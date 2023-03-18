const express = require('express');

const ctrl = require('../../controllers/news');
const { getNewsQueryParam } = require('../../models');

const router = express.Router();

const { ctrlWrapper, validateQueryParams } = require('../../middlewares');

router.get(
  '/',
  validateQueryParams(getNewsQueryParam),
  ctrlWrapper(ctrl.getAllNews)
);

module.exports = router;
