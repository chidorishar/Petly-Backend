const service = require("../../services/notices");

const addNoticeToFavorites = async(req, res) => { 
    const userId = req.user;
    const noticeId = req.params.id;
    
    await service.addNoticeToFavorites(userId, noticeId);
    res.status(201).json("success");
}

module.exports = addNoticeToFavorites;