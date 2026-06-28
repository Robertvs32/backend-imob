import pool from "../../database/connection"
import { RetornoObjUserMySql } from "./usuario.type";

const UsuarioModel = {

    buscaUsuarioEmail: async (email: string) => {
        const sql = 
        `
            SELECT id_usuario, id_empresa, nome, hash_senha, id_role
            FROM usuarios
            WHERE email = ?
        `

        const [rows] = await pool.execute<RetornoObjUserMySql[]>(sql, [email]);

        return rows[0];
    }

}

export default UsuarioModel;