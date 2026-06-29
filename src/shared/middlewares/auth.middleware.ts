import { NextFunction } from "express";
import config from "../../config";
import { MyRequest } from "../types/request";
import { verificaToken } from "../../modules/auth/auth.util";
import { PayloadJwt } from "../../modules/auth/auth.type";

const AuthMiddleware = {

    verifyToken: (req: MyRequest, res: Response, next: NextFunction) => {
        const payload: PayloadJwt  = verificaToken(req.cookies.token, config.secretkey_token as string);

        req.id_usuario = payload.id_usuario;
        req.id_empresa = payload.id_empresa;
        req.id_role = payload.id_role;

        next();
    }

}