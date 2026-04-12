import { type Request, type Response, type NextFunction  } from "express"
import { type ReturnLogin, type BodyLogin } from "./auth.types.js";
import AuthServices from "./auth.services.js";

const AuthController = {

    login: async (req: Request, res: Response, next: NextFunction) => {
        const { email, senha }: BodyLogin = req.body;
        try{
            const { objUser, token, refreshToken }: ReturnLogin = await AuthServices.login(email, senha);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                partitioned: true
            });

            res.status(200).json({objUser, token});

        }catch(error){
            next(error) //PASSA O ERRO PRO MIDDLEWARE DE ERROS
        }
    },

    cadastro: async (req: Request, res: Response, next: NextFunction) => {
        const { role } = req.body;

        try{
            AuthServices
        }catch(error){
            next(error);
        }
    }

}

export default AuthController;