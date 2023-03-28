const { BadRequest } = require('http-errors');

const utils = require('./utils');
const { Notice, User } = require('../../models');

const getNoticeById = async (noticeID, userID) => {
  // const notice = await Notice.findOne({ _id: id }).select('-owner');
  const notice = await Notice.findOne({ _id: noticeID }).populate(
    'owner',
    '_id name email phone'
  );
  if (!notice) {
    throw new BadRequest(`Not found such id ${noticeID}`);
  }

  // user isn't authenticated - just return notice
  if (!userID) return notice;

  const userWithId = await User.findOne({ _id: userID });
  const extendedNotices = await utils.addFieldsRelativeToUserData(
    [notice],
    userWithId
  );

  return extendedNotices[0];
};

module.exports = getNoticeById;
