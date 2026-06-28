//ARQUIVO DE CONEXAO DO BANCO DE DADOS MYSQL

import mysql from 'mysql2/promise';
import config from '../config.ts'
import { RowDataPacket } from 'mysql2/promise';

const pool = mysql.createPool({
    host: config.host,
    database: config.db_name,
    user: config.db_user,
    password: config.db_pass,
    connectionLimit: 15,
    waitForConnections: true,
    queueLimit: 50, 
    port: Number(config.db_port)
})

export const testeConexao = async () => {
    try{
        const [rows] = await pool.execute<RowDataPacket[]>("SELECT * FROM usuarios")
        console.log(rows)
    }catch(error){
        console.log(error)
    }
}

export default pool;