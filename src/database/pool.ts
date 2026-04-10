import mysql from 'mysql2/promise';
import config from '../config/config.js';

export const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.db,
    queueLimit: 50,
    connectionLimit: 15
})