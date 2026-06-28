import { ObjUser } from "../usuario/usuario.type"

export interface LoginDto{
    email: string,
    senha: string
}

export interface ReturnLogin{
    objUser: ObjUser,
    token: string,
    refreshToken: string
}