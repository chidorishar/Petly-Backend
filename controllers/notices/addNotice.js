const service = require("../../services/notices");

const addNotice = async(req, res) => { 
    const userId = req.user;
    const data = req.body;
    
    const notice = await service.addNotice(userId, data);
    res.status(201).json(notice);
}

module.exports = addNotice;