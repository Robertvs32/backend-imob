import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SignOptions } from 'jsonwebtoken';
import { PayloadJwt } from './auth.type';

export const comparaSenhaHash = async (senha: string, hash_senha: string) => {
    return await bcrypt.compare(senha, hash_senha);
}

export const criarToken = (payload: any, secretkey: string, duracao: SignOptions['expiresIn']) => {
    return jwt.sign(payload,secretkey, {expiresIn: duracao})
}

export const verificaToken = (token: string, secretkey: string) => {
    const result = jwt.verify(token, secretkey) as PayloadJwt;
    const {id_usuario, id_empresa, id_role, nome} = result

    const payload: PayloadJwt = {
        id_usuario,
        id_empresa,
        nome,
        id_role
    }

    return payload; 
}