const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');

function valuesToAdd(req,res,next){
    let name = req.body.name;
    let user_id = req.user.id;
    if(!name){
        return res.status(400).json({message:'all fields are required'});
    }
    req.name = name;
    next();
}

function ValidId(req,res,next){
    try {
        
        let id = Number(req.params.id);
        if(isNaN(id) || id <= 0)
            res.status(400).json('id not valid');
        
        req.id = id;
        next();
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {valuesToAdd , ValidId};