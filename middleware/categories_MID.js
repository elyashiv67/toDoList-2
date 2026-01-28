
function valuesToAdd(req,res,next){
    let name = req.body.name;
    let user_id = req.body.user_id;
    if(!name){
        return res.status(400).json({message:'all fields are required'});
    }
    req.name = name;
    next();
}
//need to add values to edit as middleware
function valuesToEdit(req,res,next){
    let name = req.body.name;
    let user_id = req.body.user_id;
    if(!name){
        return res.status(400).json({message:'all fields are required'});
    }
    if(!user_id){
        user_id = null;
    }
    req.name = name;
    req.user_id = user_id;
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

module.exports = {valuesToAdd , valuesToEdit, ValidId};