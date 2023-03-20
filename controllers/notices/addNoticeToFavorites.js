const service = require("../../services/notices");

const addNoticeToFavorites = async(req, res) => { 
    const userId = req.user;
    const noticeId = req.params.id;
    
    const notice = await service.addNoticeToFavorites(userId, noticeId);
    res.json(notice);
}

module.exports = addNoticeToFavorites;