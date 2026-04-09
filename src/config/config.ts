import dotenv from 'dotenv';
import { AppError } from '../middlewares/err.middlewares.js';
import path from 'node:path';

dotenv.config({path: path.resolve(process.cwd(), '.env')});

const config = {
    port: process.env.PORT as string,
    host: process.env.HOST as string,
    user: process.env.USER as string,
    db: process.env.DB as string,
    password: process.env.PASSWORD as string,
    secret_key_token: process.env.SECRET_KEY_TOKEN as string,
    secret_key_refreshtoken: process.env.SECRET_KEY_REFRESHTOKEN as string
}

if(!config.secret_key_token){
    throw new AppError(".env não foi carregada corretamente!", 500);
}

export default config