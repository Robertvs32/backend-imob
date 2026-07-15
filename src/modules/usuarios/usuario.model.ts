import { ResultSetHeader } from "mysql2";
import pool from "../../database/connection"
import { 
    BuscaInfosUsuarioBanco, 
    DadosCadastroUsuario, 
    DadosUsuario, 
    DadosGeral, 
    RetornoDadosUsuarioBanco, 
    RetornoObjUserMySql, 
    AlterarDadosGeral,
    AlterarDadosUsuario,
    AlterarDadosCorretor
} from "./usuario.type";
import { PoolConnection } from "mysql2/promise";
import { updateDinamicoSql } from "./usuario.util";

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
    },

    buscaInfosUsuarioId: async (id_usuario: number) => {
        const sql = `
            SELECT 
                nome, 
                email,
                telefone,
                cep,
                numero,
                cidade,
                estado,
                id_role,
                id_empresa,
                created_at
            FROM 
                usuarios
            WHERE 
                id_usuario = ?
        `

        const [rows] = await pool.execute<BuscaInfosUsuarioBanco[]>(sql, [id_usuario]);

        if(rows.length > 0) return rows[0] as DadosGeral

        return null;
    },

    buscaDadosUsuario: async (id_usuario: number) =>{
        const sql = `
            SELECT 
                rg,
                cpf,
                renda_bruta,
                estado_civil,
                profissao,
                link_doc,
                link_holerite,
                link_irpf,
                link_residencia,
                link_certidao
            FROM 
                dados_usuarios
            WHERE   
                id_usuario = ?
        `
        const [rows] = await pool.execute<RetornoDadosUsuarioBanco[]>(sql, [id_usuario]);

        if(rows.length > 0) return rows[0] as DadosUsuario

        return null
    },

    alteraDadosGeral: async (dadosGeral: AlterarDadosGeral, id_usuario: number, connection: PoolConnection) => {
        let { sql, array } = updateDinamicoSql(dadosGeral, "usuarios");
        sql += "WHERE id_usuario = ?"
        array.push(id_usuario)

        await connection.execute(sql, array);
    },

    alteraDadosUsuario: async (dadosUsuario: AlterarDadosUsuario, id_usuario: number, connection: PoolConnection) => {
        let { sql, array } = updateDinamicoSql(dadosUsuario, "dados_usuarios");
        sql += "WHERE id_usuario = ?"
        array.push(id_usuario)

        await connection.execute(sql, array);
    },

    alteraDadosCorretor: async (dadosCorretor: AlterarDadosCorretor, id_usuario: number, connection: PoolConnection) => {
        let { sql, array } = updateDinamicoSql(dadosCorretor, "dados_corretores");
        sql += "WHERE id_corretor = ?"
        array.push(id_usuario)

        await connection.execute(sql, array);
    },



}

export default UsuarioModel;