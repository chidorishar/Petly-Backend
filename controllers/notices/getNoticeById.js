const service = require("../../services/notices");

const getNoticeById = async(req, res) => {    
    const id = req.params.id;
    const notice = await service.getNoticeById(id);
    res.json(notice);
}

module.exports = getNoticeById;