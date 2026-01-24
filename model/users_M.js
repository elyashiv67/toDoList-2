const db = require('../config/db_config');


async function getAll() {
    let sql = 'SELECT id,name,email,user_name,pass,is_admin FROM users';
    let [rows] = await db.query(sql);
    console.log(rows);

    return rows;
}

async function getById(id) {
    let sql = `SELECT id,name,email,user_name,pass,is_admin FROM users WHERE id = ?`;
    let [row] = await db.query(sql, [id]);
    return row[0];

}

async function deleteById(id) {
    let sql = `DELETE FROM users WHERE id = ?`; //פה שמתי סימן שאלה ולא כמו בדוגמה הקודמת מכיוון שאני שולח את ה id דרך הפונקציה וזה דרך אחת להיזהר 
    //מ sql injection
    let [result] = await db.query(sql, [id]);
    return result.affectedRows;
}

async function patchUser(id, user) {
    let keys = Object.keys(user);
    console.log(keys);
    let values = Object.values(user);
    console.log(values);
    let set = keys.map(k => `${k}=?`).join(',');
    let sql = `UPDATE users SET ${set} WHERE id = ?`;
    console.log(sql);

    let [result] = await db.query(sql, [...values, id]);
    return result.affectedRows;
}

module.exports = {
    getAll, getById, deleteById, patchUser
}