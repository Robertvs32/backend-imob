import { type ObjUser, type ReturnLogin, type ReturnVerificaUsuario } from "./auth.types.js"
import AuthModels from "./auth.models.js";
import { AppError } from "../../middlewares/err.middlewares.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import config from "../../config/config.js";

const AuthServices = {

    login: async (email: string, senha: string): Promise<ReturnLogin> => {
        const dadosUsuario: ReturnVerificaUsuario | null = await AuthModels.verificaUsuario(email);

        if(!dadosUsuario){
            throw new AppError("Verifique email ou senha!", 401);
        }

        const senhaValida = await bcrypt.compare(senha, dadosUsuario.hash_senha);

        if(!senhaValida){
            throw new AppError("Verifique email ou senha!", 401);
        }

        const payload: ObjUser = {
            id_usuario: dadosUsuario.id_usuario,
            id_empresa: dadosUsuario.id_empresa,
            id_role: dadosUsuario.id_role,
            nome: dadosUsuario.nome
        }

        const token = jwt.sign(payload, config.secret_key_token, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, config.secret_key_refreshtoken, { expiresIn: '1d' });

        return{ 
            objUser: payload,
            token,
            refreshToken
        }
    }

}

export default AuthServices;