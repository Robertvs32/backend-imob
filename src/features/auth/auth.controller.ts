import { type Request, type Response } from "express"
import { type ReturnLogin, BodyLogin } from "./auth.types.js";

const AuthController = {

    login: async (req: Request, res: Response) => {
        const { email, senha }: BodyLogin = req.body;
        const { objUser, token, refreshToken }: ReturnLogin = await authServices.login(email, senha);
    }

}

export default AuthController;