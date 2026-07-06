import { Request } from "express";

export interface MyRequest extends Request{
    id_usuario?: number,
    id_empresa?: number,
    id_role?: number
}