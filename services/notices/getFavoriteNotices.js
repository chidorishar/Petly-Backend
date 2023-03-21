const { Notice, User } = require('../../models');
const { BadRequest } = require('http-errors');

const getFavoriteNotices = async (userId,  { skip, limit }) => {
    
     const list = await User.findOne({_id: userId}, {favoriteNotices: 1})
     if (!list) {
        throw new BadRequest(`User with such id ${userId} not found`);
     }
     const notices = await Notice.find({ _id: { $in: list.favoriteNotices } })
     .skip(skip)
     .limit(limit);

     // console.log(notices) 
     if (!notices) {
         throw new BadRequest(`Not found favotite notices  by ${userId}`);
     }
     return notices;    
    
}

module.exports = getFavoriteNotices;