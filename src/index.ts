import express from 'express'
import { errMiddleware } from './middlewares/err.middlewares.js';
import cors from 'cors';
import config from './config/config.js';

const app = express()

app.use(cors({
    origin: 'url',
    credentials: true
}));

app.use(express.json());
app.use(errMiddleware);

app.listen(config.port, () => {
    console.log(`Rodando na porta ${config.port}!`);
})