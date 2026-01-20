const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // creats and verifies tokens that are sent to the client and helps us to know which user is making the request 
// and if he is authorized to make this request

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
async function login(req,res,next) {
    try{ 
        const user = await getByUserName(req.body.userName);
        if(!user){
            return res.status(400).json({message:"user name or password is incorrect"});
        }
        const isMatch = await bcrypt.compare(req.body.pass, user.pass);
        if(!isMatch){
            return res.status(400).json({message:"user name or password is incorrect"});
        }
        req.user = user;
        next();

    }catch(err){
        res.status(500).json({message:"Server error"})
    }
}


function createJwt(req,res){ 
    try {
        let token =  jwt.sign({         // create the token, first param is the payload (data to store in the token like user id and user name)
            id: req.user.id,                 // second param is the secret key to sign the token and i wrote it in .env file
            userName: req.user.user_name     // third param is options like expiration time
            },
            process.env.SECRET_KEY,
            {expiresIn: '3h'}
        );
        console.log(token);   
        res.cookie('jwt',token,{
            maxAge:1000*60*60*3,
            httpOnly:true,
            sameSite:'lax',
            secure:false
        }).status(200).json({message:"Login successful"}); 
        
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"server error"});
    }
    
}

module.exports ={
    addUser, login, createJwt
}
