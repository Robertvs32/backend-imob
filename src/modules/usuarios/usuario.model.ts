import { ResultSetHeader } from "mysql2";
import pool from "../../database/connection"
import { DadosCadastroUsuario, RetornoObjUserMySql } from "./usuario.type";
import { PoolConnection } from "mysql2/promise";

const UsuarioModel = {

    buscaUsuarioEmail: async (email: string) => {
        const sql = 
        `
            SELECT id_usuario, id_empresa, nome, hash_senha, id_role
            FROM usuarios
            WHERE email = ?
        `

        const [rows] = await pool.execute<RetornoObjUserMySql[]>(sql, [email]);

        if(rows.length == 0) return null;

        return rows[0];
    },

    cadastrarUsuario: async (dadosUsuario: DadosCadastroUsuario, id_empresa: number, connection: PoolConnection) => {
        const sql = `
            INSERT INTO usuarios(
                nome,
                email,
                hash_senha,
                telefone,
                cep,
                numero,
                cidade,
                estado,
                id_role,
                id_empresa
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `
        const [usuario] = await connection.execute<ResultSetHeader>(sql, [
            dadosUsuario.nome,
            dadosUsuario.email,
            dadosUsuario.hash_senha,
            dadosUsuario.telefone,
            dadosUsuario.cep,
            dadosUsuario.numero,
            dadosUsuario.cidade,
            dadosUsuario.estado,
            dadosUsuario.id_role,
            id_empresa
        ]);

        if(usuario) return usuario.insertId;

        return null;
    },

    criarDadosUsuario: async (id_usuario: number, connection: PoolConnection) => {
        const sql = `
            INSERT INTO dados_usuarios(id_usuario)
            VALUE(?);
        `
        await connection.execute(sql, [id_usuario]);
    }

}

export default UsuarioModel;