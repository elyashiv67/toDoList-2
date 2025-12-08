const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');

function valuesToAdd(req,res,next){
    let name = req.body.name;
    let user_id = req.user.id;
    if(!name){
        return res.status(400).json({message:'all fields are required'});
    }
    next();
}

module.exports = {valuesToAdd};