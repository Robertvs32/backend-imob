import { Request, Response } from "express"

const AuthController = {

    login: async (req: Request, res: Response) => {
        const { email, senha }: { email: string, senha: string } = req.body;
    }

}

export default AuthController;