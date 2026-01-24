const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {checkAdmin} = require('../model/auth_M.js');

function valuesToAdd(req,res,next){
    let {name,email,userName,pass,is_admin} = req.body;
    if(!name || !email || !userName || !pass || is_admin === undefined || is_admin === null){
        return res.status(400).json({message:'all fields are required'});
    }
    next();
}

function valuesToLogin(req,res,next){
    let {userName,pass} = req.body;
    if(!userName || !pass){
        return res.status(400).json({message:'all fields are required'});
    }
    next();
}

async function encryptPass(req,res,next){
    let pass = req.body.pass
    console.log(pass);
    let hashPass = await bcrypt.hash(pass,10)
    console.log(hashPass);
    req.pass = hashPass;
    req.user = {...req.body, pass:hashPass};
    next();
}

function isLoggedIn(req,res,next){
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({message:"please log in"});
    }
    try {
        const payload = jwt.verify(token,process.env.SECRET_KEY);
        req.user = payload;

        // req.user = { //for dev only
        // id: 20,
        // name: 'ari',
        // email: 'ari@ar1',
        // user_name: 'ariUser1',
        // pass: '$2b$10$JEGmGK3rj1.P.nUCJGOiiO8iDROC9tMb5jhR8CNeJ2FlCxV0xEs0a',
        // is_admin: 1
        // };

        next();
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
}


async function isAdmin(req,res,next){
    const user = req.user;
    console.log(user);
    if(!user){
        return res.status(401).json({message:"please log in"});
    }
    try {
        let isAdmin = await checkAdmin(user.id);
        console.log(isAdmin);
        if(!isAdmin){
            return  res.status(403).json({message:"access denied"});
        }
        next();
    } catch (error) {
        res.status(500).json({message:"server error"});
    }
}

module.exports = {valuesToAdd,
    encryptPass,
    valuesToLogin,
    isLoggedIn,
    isAdmin
    };