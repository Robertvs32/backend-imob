import { RowDataPacket } from "mysql2";

export interface ObjUser{
    id_usuario: number,
    id_empresa: number,
    nome: string,
    id_role: number,
}

export interface ObjUserCompleto extends ObjUser{
    hash_senha: string
}

export interface RetornoObjUserMySql extends RowDataPacket, ObjUserCompleto {}