const { Notice } = require('../../models');
const { BadRequest } = require('http-errors');

const getNoticebyId = async id => {
  const notice = await Notice.findOne({ _id: id });

  if (!notice) {
    throw new BadRequest(`Not found such id ${id}`);
  }
  return notice;
};

module.exports = getNoticebyId;
