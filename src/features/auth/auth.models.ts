import { pool } from "../../database/pool.js"
import { type ReturnVerificaUsuario } from "./auth.types.js";

const AuthModels = {

    verificaUsuario: async (email: string): Promise<ReturnVerificaUsuario | null> => {
        const sql = 
        `SELECT id_usuario, id_empresa, nome, hash_senha, id_roles 
         FROM usuarios WHERE email = ?
        `
        const [rows] = await pool.execute<ReturnVerificaUsuario[]>(sql, [email]);
        
        const user = rows[0];
    
        if(user){
            return user;
        }

        return null
    }

}

export default AuthModels