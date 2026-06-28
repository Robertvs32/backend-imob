import { NextFunction, Response, Request } from "express"
import { LoginDto, ReturnLogin } from "./auth.dto";
import AuthService from "./auth.service";

const AuthController = {

    login: async (req: Request, res: Response, next: NextFunction) => {
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
    }

}

export default AuthController;