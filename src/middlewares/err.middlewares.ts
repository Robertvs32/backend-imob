import { type Request, type Response, type NextFunction } from "express"

export class AppError {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number){
        this.message = message;
        this.statusCode = statusCode
    }
}

export const errMiddleware = (err: AppError | Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode ? err.statusCode : 500).json({mensagem: err.message})
    }

    return res.status(500).json({mensagem: `${err.message}`});
}