const getNoticeById = require('./getNoticeById');
const getNoticesByCategory = require('./getNoticesByCategory');
const getOwnNotices = require('./getOwnNotices');
const getFavoriteNotices = require('./getFavoriteNotices');
const addNoticeToFavorites = require('./addNoticeToFavorites');
const addNotice = require('./addNotice');
const deleteOwnNotice = require('./deleteOwnNotice');
const deleteNoticeFromFavorites = require('./deleteNoticeFromFavorites');

module.exports = {
  getNoticeById,
  getNoticesByCategory,
  getOwnNotices,
  getFavoriteNotices,
  addNoticeToFavorites,
  addNotice,
  deleteOwnNotice,
  deleteNoticeFromFavorites,
};
