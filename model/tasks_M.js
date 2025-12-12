const db = require('../config/db_config');

async function getAll(user_id) {
    let sql = 'SELECT  name, description, isDone, user_id, category_id FROM tasks WHERE user_id = ?';
    let [rows] = await db.query(sql, [user_id]);
    console.log(rows);
    return rows;
}

async function getById(id , user_id) {
    const sql = "SELECT name, description, isDone, user_id, category_id FROM tasks WHERE id = ? and user_id = ?";
    const [row] = await db.query(sql, [id , user_id]); 
    return row[0];
}

async function add(name , description , category_id , user_id) {
    const sql = "INSERT INTO tasks( name, description, category_id, user_id) VALUES (?,?,?,?)";
    const [result] = await db.query(sql, [name , description , category_id , user_id]); 
    console.log(result);
    return result.insertId;
}

module.exports= {
    getAll,
    getById,
    add
};