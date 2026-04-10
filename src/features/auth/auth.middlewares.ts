import { type Request, type Response, type NextFunction } from "express"
import { AppError } from "../../middlewares/err.middlewares.js";
import type { Payload, UserRequest } from "./auth.types.js";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";

const AuthMiddleware = {

    tokenVerify: (req: UserRequest, res: Response, next: NextFunction) => {
        try{
            //Recupera o token do req
            const token = req.get('Authorization')?.split(' ')[1];

            if(!token){
                throw new AppError("Permissão negada!", 401);
            }

            const payload: Payload = jwt.verify(token, config.secret_key_token) as Payload;

            req.id_role = payload.id_role;
            req.id_usuario = payload.id_usuario;
            req.id_empresa = payload.id_empresa;

            next();
        }catch(error){
            if(error instanceof jwt.TokenExpiredError){
                next(new AppError("Token expirado!", 401));
            }

            next(new AppError("Token inválido!", 401));
            
        }
        
    }

}

export default AuthMiddleware;