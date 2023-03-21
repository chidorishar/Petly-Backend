const { Notice } = require('../../models');
const { BadRequest } = require('http-errors');

const getNoticeById = async id => {
  const notice = await Notice.findOne({ _id: id }).select('-owner');

  if (!notice) {
    throw new BadRequest(`Not found such id ${id}`);
  }
  return notice;
};

module.exports = getNoticeById;
