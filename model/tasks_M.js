const db = require('../config/db_config');

async function getAll(user_id) {
    let sql = 'SELECT  id , name, description, isDone, user_id, category_id FROM tasks WHERE user_id = ?';
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

async function delete_task(id, user_id) {
    const sql = "DELETE FROM tasks WHERE id = ? and user_id = ?";
    const [result] = await db.query(sql, [id , user_id]); 
    console.log(result);
    return result.affectedRows;
}

async function patchTask(taskId, user_id, task) {
    let keys = Object.keys(task);
    console.log(keys);
    let values = Object.values(task);
    console.log(values);
    let set = keys.map(k=>`${k}=?`).join(',');
    let sql = `UPDATE tasks SET ${set} WHERE id = ? and user_id = ?`;
    console.log(sql);
     
    let [result] = await db.query(sql,[...values,taskId,user_id]);
    return result.affectedRows;
}

module.exports= {
    getAll,
    getById,
    add,
    delete_task,
    patchTask
};