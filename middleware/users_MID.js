function ValidId(req,res,next){
 let id = Number(req.params.id);
 if(isNaN(id) || id <= 0)
    res.status(400).json('id not valid');

 req.id = id;
 next();
}

function valuesToEdit(req,res,next){
   let obj = {};
   if(req.body.name){
      obj.name = req.body.name;
   }
   if(req.body.email){
      obj.email = req.body.email;
   }
   if(req.body.userName){
      obj.user_name = req.body.userName;
   }

   let keys = Object.keys(obj);
   if(keys.length === 0){
      return res.status(400).json({message:"there is no data"});
   }
   req.user = obj;
   next();
}


module.exports = {ValidId,valuesToEdit}