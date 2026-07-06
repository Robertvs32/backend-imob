import { NextFunction, Response, Request } from "express"
import { LoginDto, ReturnLogin } from "./auth.dto";
import AuthService from "./auth.service";
import { MyRequest } from "../../shared/types/request";

const AuthController = {

    login: async (req: MyRequest, res: Response, next: NextFunction) => {
        try{
            const dadosLogin: LoginDto = req.body;
            const returnLogin: ReturnLogin = await AuthService.login(dadosLogin.email, dadosLogin.senha);

            res.cookie('token', returnLogin.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            });

            res.cookie('refreshToken', returnLogin.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            })
            

            res.status(200).json(returnLogin.objUser)
        }catch(error){
            next(error)
        }
    },

    logout: async (req: MyRequest, res: Response, next: NextFunction) => {
        try{
            // 1. Limpa o token do cookie
            res.clearCookie('token', {sameSite: 'lax', path: '/'})

            // 2. Limpa refreshToken do cookie
            res.clearCookie('refreshToken', {sameSite: 'lax', path: '/'})

            res.status(200).json({mensagem: "Logout realizado com sucesso!"});
        }catch(error){
            next(error)
        }
    },

    refresh: async (req: MyRequest, res: Response, next: NextFunction) => {
        try{
            const refreshToken = req.cookies.refreshToken;
            const dadosUsuario = await AuthService.refresh(refreshToken);

            res.cookie('token', dadosUsuario.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax'
            });

            res.status(200).json(dadosUsuario.objUser)
            
        }catch(error){
            next(error);
        }
    }

}

export default AuthController;