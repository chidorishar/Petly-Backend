const service = require("../../services/notices");

const getNoticeById = async(req, res) => {    
    const id = req.params.id;
    console.log(id);
    const notice = await service.getNoticebyId(id);
    res.json(notice);
}

module.exports = getNoticeById;