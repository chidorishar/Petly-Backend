const getNoticeById = require('./getNoticeById');
const getNoticesByCategory = require('./getNoticesByCategory');
const getOwnNotices = require('./getOwnNotices');
const getFavoriteNotices = require('./getFavoriteNotices');
const addNoticeToFavorites = require('./addNoticeToFavorites');
const addNotice = require('./addNotice');

module.exports = {
  getNoticeById,
  getNoticesByCategory,
  getOwnNotices,
  getFavoriteNotices,
  addNoticeToFavorites,
  addNotice
};
