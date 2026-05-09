const db = require('../config/db_config');


async function getAll() {
    let sql = 'SELECT id,name,email,user_name,is_admin FROM users';
    let [rows] = await db.query(sql);
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
    const allowedKeys = ['name', 'email', 'user_name', 'pass', 'is_admin'];
    let keys = Object.keys(user).filter(k => allowedKeys.includes(k));
    if (keys.length === 0) return 0;

    console.log(keys);
    let values = keys.map(k => user[k]);
    console.log(values);
    let set = keys.map(k => `${k}=?`).join(',');
    let sql = `UPDATE users SET ${set} WHERE id = ?`;
    console.log(sql);

    let [result] = await db.query(sql, [...values, id]);
    return result.affectedRows;
}

async function getForCategories() {
    let sql = 'SELECT id,name,email,user_name FROM users';
    let [rows] = await db.query(sql);
    console.log(rows);

    return rows;
}

module.exports = {
    getAll, getById, deleteById, patchUser, getForCategories
}