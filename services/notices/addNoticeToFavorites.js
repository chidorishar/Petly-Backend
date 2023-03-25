const { User, Notice } = require('../../models');
 const { BadRequest } = require('http-errors');

const addNoticeToFavorites = async (userId,noticeId) => {    
     const notice = await Notice.findOne({ _id: noticeId });
     if(!notice) {
        throw new BadRequest(`Not found such id ${noticeId}`);
     }// добавляем в favorite, если есть id заметки есть в базе
    await User.updateOne(
        { _id: userId },
        { "$addToSet": { favoriteNotices: noticeId } }
      )         
}

module.exports = addNoticeToFavorites;