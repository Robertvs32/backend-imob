import express from 'express';
import config from './config.ts';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errMiddleware } from './shared/middlewares/err.middleware.ts';
import { testeConexao } from './database/connection.ts';
import AuthRouter from './modules/auth/auth.route.ts';

const app = express();

app.use(cors({
    origin: config.url,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(AuthRouter)

app.use(errMiddleware);

app.listen(config.port, async () => {
    console.log(`Servidor rodando na porta ${config.port}!`);
    await testeConexao()
});