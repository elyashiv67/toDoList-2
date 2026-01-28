const db = require('../config/db_config');

async function getAll(user_id) {
    let sql = 'SELECT id,name,user_id FROM categories WHERE user_id = ?';
    let [rows] = await db.query(sql, [user_id]);
    console.log(rows);
    return rows;
}
async function getAllAdmin() {
    let sql = 'SELECT id,name,user_id FROM categories';
    let [rows] = await db.query(sql);
    console.log(rows);
    return rows;
}

async function getById(id , user_id) {
    const sql = "SELECT name FROM categories WHERE id = ? and user_id = ?";
    const [row] = await db.query(sql, [id , user_id]); 
    return row[0];
}

async function add(name,user_id) {
    const sql = "INSERT INTO categories( name, user_id) VALUES (?,?)";
    const [result] = await db.query(sql, [name, user_id]); 
    console.log(result);
    return result.insertId;
}

async function deleteC(id) {
    const sql = "DELETE FROM categories WHERE id = ?";
    const [result] = await db.query(sql, [id]); 
    console.log(result);
    return result.affectedRows;
}

async function PatchCategory(id , user_id, name) {
    const sql = "UPDATE categories SET name = ? ,user_id = ? WHERE id = ?";
    const [result] = await db.query(sql, [name , user_id, id]); 
    console.log(result);
    return result.affectedRows;
}


module.exports = {
    getAll,
    getById,
    add,
    deleteC,
    PatchCategory,
    getAllAdmin
}