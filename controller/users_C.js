const {getAll} = require('../model/users_M.js');



async function getAllUsers(req,res) {
 try {
    console.log("get users");
    rows = await getAll();
    res.status(200).json({message:"ok"});
 } catch (err) {
    res.status(500).json({message:"err"})
 }
}

module.exports={
    getAllUsers,
}