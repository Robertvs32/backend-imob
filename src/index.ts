import express from 'express';
import config from './config.ts';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { errMiddleware } from './/middlewares/err.middleware';

const app = express();

app.use(cors({
    origin: config.url,
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use(errMiddleware);

app.listen(config.port, () => {
    console.log(`Servidor rodando na porta ${config.port}!`);
});