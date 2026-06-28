import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SignOptions } from 'jsonwebtoken';

export const comparaSenhaHash = async (senha: string, hash_senha: string) => {
    return await bcrypt.compare(senha, hash_senha);
}

export const criarToken = (payload: any, secretkey: string, duracao: SignOptions['expiresIn']) => {
    return jwt.sign(payload,secretkey, {expiresIn: duracao})
}