const getNoticeById = require('./getNoticeById');
const getNoticesByCategoryAndSearchQuery = require('./getNoticesByCategoryAndSearchQuery');
const getUserNoticesBySearchQuery = require('./getUserNoticesBySearchQuery');
const addNoticeToFavorites = require('./addNoticeToFavorites');
const addNotice = require('./addNotice');
const deleteOwnNotice = require('./deleteOwnNotice');
const deleteNoticeFromFavorites = require('./deleteNoticeFromFavorites');

module.exports = {
  getNoticeById,
  getNoticesByCategoryAndSearchQuery,
  getUserNoticesBySearchQuery,
  addNoticeToFavorites,
  addNotice,
  deleteOwnNotice,
  deleteNoticeFromFavorites,
};
