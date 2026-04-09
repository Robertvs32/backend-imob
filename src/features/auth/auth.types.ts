import type { RowDataPacket } from "mysql2"

export interface ObjUser{
    id_usuario: number,
    id_empresa: number,
    id_roles: number,
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
    id_roles: number
}