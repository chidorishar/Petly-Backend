const service = require("../../services/notices");
const { BadRequest } = require('http-errors');

const deleteOwnNotice = async(req, res) => { 
    const id = req.params.id;
    const userId = req.user;
    const notice = await service.deleteOwnNotice(id, userId);
    if (!notice){
        throw new BadRequest('Notice does not exist or has been already removed');        
    }
    res.json(notice);
}

module.exports = deleteOwnNotice;