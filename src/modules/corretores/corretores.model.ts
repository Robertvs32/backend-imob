import { PoolConnection } from "mysql2/promise"
import { DadosCorretor, RetornoDadosCorretorBanco } from "../usuarios/usuario.type";
import pool from "../../database/connection";

const CorretoresModel = {
    cadastrarCorretor: async (id_usuario: number, connection: PoolConnection) => {
        const sql = `
            INSERT INTO dados_corretores(id_corretor)
            VALUE(?)
        `
        await connection.execute(sql, [id_usuario]);
    },

    buscaDadosCorretor: async (id_usuario: number) =>{
        const sql = `
            SELECT 
                creci
            FROM 
                dados_corretores
            WHERE   
                id_corretor = ?
        `
        const [rows] = await pool.execute<RetornoDadosCorretorBanco[]>(sql, [id_usuario]);

        if(rows.length > 0) return rows[0] as DadosCorretor

        return null
    }
}

export default CorretoresModel;