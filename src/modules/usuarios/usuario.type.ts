import { RowDataPacket } from "mysql2";

export interface DadosCadastroUsuario{
    nome: string,
    email: string,
    hash_senha: string,
    telefone: string,
    cep: string,
    numero: number,
    cidade: string,
    estado: string,
    id_role: number
}

export interface ObjUser{
    id_usuario: number,
    id_empresa: number,
    nome: string,
    id_role: number,
}

export interface CadastroUsuarioDto{
    nome: string,
    email: string,
    senha: string,
    confirmacaoSenha: string,
    telefone: string,
    cep: string,
    numero: number,
    cidade: string,
    estado: string,
    id_role: number
}

export interface ObjUserCompleto extends ObjUser{
    hash_senha: string
}

export interface RetornoObjUserMySql extends RowDataPacket, ObjUserCompleto {}

export interface BuscaInfosUsuarioBanco extends RowDataPacket, DadosGeral {}

export interface RetornoDadosUsuarioBanco extends RowDataPacket, DadosUsuario {}

export interface RetornoDadosUsuario extends DadosGeral, DadosUsuario {}

export interface RetornoDadosCorretorBanco extends RowDataPacket, DadosCorretor {}

//RETORNOS DA BUSCA DE INFORMAÇÕES DO USUÁRIO

export interface DadosGeral{
    nome: string
    email: string
    telefone: string
    cep: string
    numero: number
    cidade: string
    estado: string
    id_role: number
    id_empresa: number
    created_at: Date
}

export interface DadosUsuario{
    rg: string
    cpf: string
    renda_bruta: number
    estado_civil: string
    profissao: string
    link_doc: string
    link_holerite: string   
    link_irpf: string
    link_residencia: string
    link_certidao: string
}

export interface DadosCorretor{
    creci: string
}

export interface RetornoDadosGeral{
    geral: DadosGeral
}

export interface RetornoDadosUsuario{
    geral: DadosGeral
    usuario: DadosUsuario
}

export interface RetornoDadosCorretor{
    geral: DadosGeral
    corretor: DadosCorretor
}


//TYPES ALTERAR DADOS USUARIOS
export interface AlterarDadosGeral{
    nome?: string
    email?: string
    telefone?: string
    cep?: string
    numero?: number
    cidade?: string
    estado?: string
}

export interface AlterarDadosUsuario{
    rg?: string
    cpf?: string
    renda_bruta?: number
    estado_civil?: string
    profissao?: string
}

export interface AlterarDadosCorretor{
    creci?: string
}

export interface DadosAlterar{
    geral?: AlterarDadosGeral
    usuario?: AlterarDadosUsuario
    corretor?: AlterarDadosCorretor
}