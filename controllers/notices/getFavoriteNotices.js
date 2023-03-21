const service = require("../../services/notices");

const getFavoriteNotices = async(req, res) => { 
    let { page = 1, limit = 20 } = req.query;
    limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
    const skip = (parseInt(page) - 1) * limit;

    const userId = req.user;
    // console.log(userId);
    const notices = await service.getFavoriteNotices(userId, {skip, limit});
    res.json(notices);
}

module.exports = getFavoriteNotices;