const db = require('../config/db_config');


async function getAll(){
    let sql = 'SELECT id,name,email FROM users';
    let [rows] = await db.query(sql);
    console.log(rows);

    return rows;
}

async function getById(id) {
let sql = `SELECT id,name,email FROM users WHERE id = ${id}`;
let [row] = await db.query(sql);
return row[0];
    
}

module.exports = {
    getAll,getById,
}