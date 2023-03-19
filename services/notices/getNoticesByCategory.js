 const { Notice } = require('../../models/notice');
 const { BadRequest } = require('http-errors');

const getNoticesByCategory = async (category,  { skip, limit }) => {
    console.log('In service getNoticebyId category = ', category);
    const notices = await Notice.find({ category })
    .skip(skip)
    .limit(limit);
    // console.log(notices)
    if (!notices) {
        throw new BadRequest(`Not found such category ${category}`);
      }
    return notices;
}

module.exports = getNoticesByCategory;