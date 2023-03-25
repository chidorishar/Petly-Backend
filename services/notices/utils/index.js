const filterNotices = require('./filterNotices');
const addFieldsRelativeToUserData = require('./addFieldsRelativeToUserData');

module.exports = {
  ...filterNotices,
  ...addFieldsRelativeToUserData,
};
