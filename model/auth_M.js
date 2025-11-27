const db = require('../config/db_config');

async function addUserDb({name,email,userName,pass}) { 
    const sql = "INSERT INTO users( name, email, user_name, pass) VALUES (?,?,?,?)";
    const [result] = await db.query(sql, [name, email, userName, pass]); 
    console.log(result);
    return {name, email,userName};
}

module.exports = {
    addUserDb,
};
    