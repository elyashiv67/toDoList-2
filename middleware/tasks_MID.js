
function ValidValues(req,res,next){
    let name = req.body.name;
    let description = req.body.description;
    let user_id = req.user.id;
    let category_id = req.body.category_id;
    if(!name || !description){
        return res.status(400).json({message:'all fields are required'});
    }
    if(!category_id){
        req.category_id = null;
    }
    req.name = name;
    req.desc = description;
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

function ValuesToEdit(req,res,next){
    let obj = {};
    if(req.body.name){
        obj.name = req.body.name;
    }
    if(req.body.description){
        obj.description = req.body.description;
    }
    if(req.body.isDone){
        obj.isDone = req.body.isDone;
    }
    let keys = Object.keys(obj);
    if(keys.length == 0){
        return res.status(400).json({message:'at least one field is required'});
    }
    req.values = obj;
    next();
}

module.exports = {ValidId,
    ValidValues,
    ValuesToEdit,
};