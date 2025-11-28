const {addUserDb , getByUserName, getByEmail ,} = require('../model/auth_M.js');

async function addUser(req,res) {
    try{ 
        const userExists = await getByUserName(req.body.userName);
        if(userExists){
            return res.status(400).json({message:"user name already exists"});
        }
        const emailExists = await getByEmail(req.body.email);
        if(emailExists){
            return res.status(400).json({message:"email already exists"});
        }
        const user = await addUserDb(req.user);
        console.log(user);
        res.status(200).json({message:"User added", user});

    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}

module.exports ={
    addUser,
}
