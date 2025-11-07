const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    dateStrings: true 
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
  } else {
    console.log('✅ MySQL connected successfully');
    connection.release();
  }
});

module.exports = pool.promise();