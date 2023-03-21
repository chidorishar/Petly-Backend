const { Notice } = require('../../models');
const { BadRequest } = require('http-errors');

const getNoticesByCategory = async (category, { skip, limit }) => {
  const notices = await Notice.find({ category })
    .skip(skip)
    .limit(limit)
    .select('-owner');

  if (!notices) {
    throw new BadRequest(`Not found such category ${category}`);
  }
  return notices;
};

module.exports = getNoticesByCategory;
