const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function valuesToAdd(req,res,next){
    let {name,email,userName,pass} = req.body;
    if(!name || !email || !userName || !pass){
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
    console.log(12);
    const token = req.cookies.jwt;
    console.log(token);
    
    if(!token){
        return res.status(401).json({message:"please log in"});
    }
    try {
        const payload = jwt.verify(token,process.env.SECRET_KEY);
        console.log(payload);
        req.user = payload;
        next();
    } catch (error) {
        res.status(500).json({message:"server error"});
    }

}

module.exports = {valuesToAdd,
    encryptPass,
    valuesToLogin,
    isLoggedIn,
    };