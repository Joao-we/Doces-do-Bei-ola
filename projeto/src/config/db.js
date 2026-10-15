const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vovo6',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
})

module.exports = pool