import UsuarioModel from "../usuarios/usuario.model";
import { ReturnLogin } from "./auth.dto";
import { ObjUserCompleto } from "../usuarios/usuario.type";
import { AppError } from "../../shared/middlewares/err.middleware";
import { comparaSenhaHash, criarToken, verificaToken } from "./auth.util";
import config from "../../config";

const AuthService = {

    login: async (email: string, senha: string): Promise<ReturnLogin> => {
        
        // 1. Busca os dados do usuario pelo email
        const dadosUsuario: ObjUserCompleto = await UsuarioModel.buscaUsuarioEmail(email);

        // 2. Verifica se o usuario existe
        if(!dadosUsuario) throw new AppError('Verifique email ou senha!', 404);

        const {hash_senha, ...payload} = dadosUsuario;
        
        // 3. Verifica se a senha esta correta
        const resultadoComparaSenha = await comparaSenhaHash(senha, hash_senha);
        if(!resultadoComparaSenha) throw new AppError('Verifique email ou senha!', 404);
        
        // 4. Cria token
        const token = criarToken(payload, config.secretkey_token as string, '15m');

        // 5. Cria refreshToken
        const refreshToken = criarToken(payload, config.secretkey_refreshtoken as string, '1d');

        // 6. Cria o objeto que sera retornado ao controller
        const dados: ReturnLogin = { objUser: payload, token, refreshToken };

        // 7. Retorna os dados ao controller
        return dados
    },

    refresh: async (refreshToken: string) => {
        const payload = verificaToken(refreshToken, config.secretkey_refreshtoken as string);
        const novoToken = criarToken(payload, config.secretkey_token as string, '15m');

        return {
            objUser: payload,
            token: novoToken
        }
    }

}

export default AuthService