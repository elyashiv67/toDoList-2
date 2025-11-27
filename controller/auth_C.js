const {addUserDb} = require('../model/auth_M.js');

async function addUser(req,res) {
    try{ 
        const user = await addUserDb(req.body);
        console.log(user);
        res.status(200).json({message:"User added", user});

    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}

module.exports ={
    addUser,
}
