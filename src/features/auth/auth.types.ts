export interface ObjUser{
    id: number,
    id_empresa: number,
    roles: number,
    nome: string
}

export interface ReturnLogin{
    objUser: User, 
    token: string, 
    refreshToken: string 
}

export interface BodyLogin{ 
    email: string, 
    senha: string 
}