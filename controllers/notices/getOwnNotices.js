const service = require("../../services/notices");

const getOwnNotices = async(req, res) => { 
    let { page = 1, limit = 20 } = req.query;
    limit = parseInt(limit) > 20 ? 20 : parseInt(limit);
    const skip = (parseInt(page) - 1) * limit;

    // console.log("In controller")
    const userId = req.user;
    const notices = await service.getOwnNotices(userId, {skip, limit});
    res.json(notices);
}

module.exports = getOwnNotices;