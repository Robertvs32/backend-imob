import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'imobdatabase',
    queueLimit: 50,
    connectionLimit: 15
})