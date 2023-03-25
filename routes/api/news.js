const express = require('express');

const ctrl = require('../../controllers/news');
const { getAllNewsQueryParam } = require('../../models');

const router = express.Router();

const { ctrlWrapper, validateQueryParams } = require('../../middlewares');

router.get(
  '/',
  validateQueryParams(getAllNewsQueryParam),
  ctrlWrapper(ctrl.getAllNews)
);
router.get(
  '/:searchQuery',
  validateQueryParams(getAllNewsQueryParam),
  ctrlWrapper(ctrl.getNewsBySearchQuery)
);

module.exports = router;
