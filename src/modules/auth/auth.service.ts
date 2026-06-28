import UsuarioModel from "../usuario/usuario.model";
import { ReturnLogin } from "./auth.dto";
import { ObjUserCompleto } from "../usuario/usuario.type";
import { AppError } from "../../shared/middlewares/err.middleware";
import { comparaSenhaHash, criarToken } from "./auth.util";
import config from "../../config";

const AuthService = {

    login: async (email: string, senha: string): Promise<ReturnLogin> => {
        
        //retorna os dados do usuario, buscando pelo email
        const dadosUsuario: ObjUserCompleto = await UsuarioModel.buscaUsuarioEmail(email);

        //verifica se o usuario existe
        if(!dadosUsuario) throw new AppError('Verifique email ou senha!', 404);

        const {hash_senha, ...payload} = dadosUsuario;
        
        //verifica se a senha esta correta
        const resultadoComparaSenha = await comparaSenhaHash(senha, hash_senha);
        if(!resultadoComparaSenha) throw new AppError('Verifique email ou senha!', 404);
        
        //cria token
        const token = criarToken(payload, config.secretkey_token as string, '15m');

        //cria refreshToken
        const refreshToken = criarToken(payload, config.secretkey_refreshtoken as string, '1d');

        const dados: ReturnLogin = { objUser: payload, token, refreshToken };

        return dados
    }

}

export default AuthService