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

async function deleteById(id) {
    let sql = `DELETE FROM users WHERE id = ?`; //פה שמתי סימן שאלה ולא כמו בדוגמה הקודמת מכיוון שאני שולח את ה id דרך הפונקציה וזה דרך אחת להיזהר 
    //מ sql injection
    let [result] = await db.query(sql , [id]);
    return result.affectedRows;
}

module.exports = {
    getAll,getById,deleteById,
}