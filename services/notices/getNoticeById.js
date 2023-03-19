const { Notice } = require('../../models/notice');
const { BadRequest } = require('http-errors');
// const { ObjectId } = require('mongodb');

const getNoticebyId = async id => {
  console.log('In service getNoticebyId id = ', id);

  const notice = await Notice.findOne({ _id: id });

  if (!notice) {
    throw new BadRequest(`Not found such id ${id}`);
  }
  return notice;
};

module.exports = getNoticebyId;
