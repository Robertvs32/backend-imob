import { JwtPayload } from "jsonwebtoken";

export interface PayloadJwt extends JwtPayload{
    id_usuario: number;
    id_empresa: number;
    nome: string;
    id_role: number;
}