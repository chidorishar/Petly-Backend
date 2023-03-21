const express = require('express');
const router = express.Router();

const { getServices } = require('../../controllers/services');
const { ctrlWrapper } = require('../../middlewares');

router.get('/', ctrlWrapper(getServices));

module.exports = router;
