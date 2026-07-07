import { PoolConnection } from "mysql2/promise"

const CorretoresModel = {
    cadastrarCorretor: async (id_usuario: number, connection: PoolConnection) => {
        const sql = `
            INSERT INTO dados_corretores(id_corretor)
            VALUE(?)
        `
        await connection.execute(sql, [id_usuario]);
    }
}

export default CorretoresModel;