import type { RowDataPacket } from "mysql2";
import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface ObjUser{
    id_usuario: number,
    id_empresa: number,
    id_role: number,
    nome: string
}

export interface ReturnLogin{
    objUser: ObjUser, 
    token: string, 
    refreshToken: string 
}

export interface BodyLogin{ 
    email: string, 
    senha: string 
}
//Extende rowDataPacket, que é a interface de retorno de uma linha do mysql, pra identificação no typescript
export interface ReturnVerificaUsuario extends RowDataPacket{
    id_usuario: number,
    id_empresa: number,
    nome: string,
    hash_senha: string,
    id_role: number
}

export interface UserRequest extends Request{
    id_usuario: number,
    id_empresa: number,
    id_role: number
}

export interface Payload extends JwtPayload{
    id_usuario: number,
    id_empresa: number,
    id_role: number
}