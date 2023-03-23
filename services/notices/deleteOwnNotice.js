const { User, Notice } = require('../../models');
// const { BadRequest } = require('http-errors');

const deleteOwnNotice = async (id, owner) => {
  const notice = await Notice.findByIdAndRemove({ _id: id, owner });
  // console.log(owner)
  await User.findOneAndUpdate({ _id: owner }, { $pull: { notices: id } });
  // console.log(notices);
  // return {notice, notices}
  return notice;
};

module.exports = deleteOwnNotice;
