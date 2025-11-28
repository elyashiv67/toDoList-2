const db = require('../config/db_config');

async function addUserDb({name,email,userName,pass}) { 
    const sql = "INSERT INTO users( name, email, user_name, pass) VALUES (?,?,?,?)";
    const [result] = await db.query(sql, [name, email, userName, pass]); 
    console.log(result);
    return result.insertId;
}

async function getByUserName(userName) {
    try {
        const sql = "SELECT * FROM users WHERE user_name = ?";
        const [rows] = await db.query(sql, [userName]);
        return rows[0];
    } catch (err) {
        console.log(err);
    }
}

async function getByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(sql, [email]);
    return rows[0];
}
module.exports = {
    addUserDb, getByUserName, getByEmail ,
};
    
