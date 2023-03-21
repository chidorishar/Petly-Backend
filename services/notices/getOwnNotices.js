const { Notice } = require('../../models');
const { BadRequest } = require('http-errors');

const getOwnNotices = async (userId, { skip, limit }) => {
  const notices = await Notice.find({ _id: userId })
    .skip(skip)
    .limit(limit)
    .select('-owner');
  // console.log(notices)
  if (!notices) {
    throw new BadRequest(`Not found notices created by ${userId}`);
  }
  return notices;
};

module.exports = getOwnNotices;
