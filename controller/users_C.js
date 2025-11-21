const {getAll,getById,deleteById,patchUser} = require('../model/users_M.js');



async function getAllUsers(req,res) {
 try {
    let users = await getAll();
    
    if(users.length == 0){
      res.status(400).json({message:'no data'});
    }
    res.status(200).json(users);
 } catch (err) {
    res.status(500).json({message:"err"});
 }
}

async function getUser(req,res) {
   try {
      let user = await getById(req.id);
      console.log(user);
      if(!user){
         res.status(400).json({message:'no user found'});
      }
      res.status(200).json({message:'ok'});
   } catch (err) {
      res.status(500).json({message:"err"});
   }
}

async function deleteUser(req,res) {
   try {
   let affectedRows = await deleteById(req.id);
   console.log(affectedRows);
      if(!affectedRows){
         res.status(400).json({message:'no user found'});
      }
      res.status(200).json({message:'deleted'});
   } catch (err) {
      res.status(500).json({message:"server error"});
   }

}

async function updateUser(req,res) {
   try {
   let user = await patchUser(req.id,req.user);
   console.log(user);
      if(!user){
         res.status(400).json({message:'no user found'});
      }
      res.status(200).json({message:'updated'});
   } catch (err) {
      console.log(err);
      res.status(500).json({message:"server error"});
   }
}

module.exports={
    getAllUsers,getUser,deleteUser,updateUser
}