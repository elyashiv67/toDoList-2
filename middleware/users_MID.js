function ValidId(req,res,next){
 let id = Number(req.params.id);
 if(isNaN(id) || id <= 0)
    res.status(400).json('id not valid');

 req.id = id;
 next();
}


module.exports = {ValidId,}