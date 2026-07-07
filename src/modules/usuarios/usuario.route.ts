import { Router } from "express";
import AuthMiddleware from "../../shared/middlewares/auth.middleware";
import UsuariosController from "./usuario.controller";

const UsuariosRouter = Router();

UsuariosRouter.post('/cadastrarusuario', AuthMiddleware.verifyToken, AuthMiddleware.verifyAdm, UsuariosController.cadastrarUsuario)

export default UsuariosRouter;