import config from "../../config";
import { MyRequest } from "../types/request";
import { verificaToken } from "../../modules/auth/auth.util";
import { PayloadJwt } from "../../modules/auth/auth.type";
import {AppError} from './err.middleware'
import { Response, NextFunction } from "express";

const AuthMiddleware = {

    verifyToken: (req: MyRequest, res: Response, next: NextFunction) => {
        const token = req.cookies.token;

        if(!token){
            throw new AppError("Token inválido!", 403);
        }

        const payload: PayloadJwt = verificaToken(token, config.secretkey_token as string);

        req.id_usuario = payload.id_usuario;
        req.id_empresa = payload.id_empresa;
        req.id_role = payload.id_role;

        next();
    },

    verifyAdm: (req: MyRequest, res: Response, next: NextFunction) => {

        if(req.id_role !== 1 && req.id_role !== 2){
            throw new AppError("Permissão negada!", 403);
        }

        next();
    },

}

export default AuthMiddleware;