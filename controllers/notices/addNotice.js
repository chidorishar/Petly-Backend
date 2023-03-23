const service = require("../../services/notices");

const addNotice = async(req, res) => { 
    // to do  обработка корректности даты
    const image = req.url;
    const userId = req.user;
    const data = req.body;
    
    const notice = await service.addNotice(userId, data, image);
    res.status(201).json(notice);
}

module.exports = addNotice;