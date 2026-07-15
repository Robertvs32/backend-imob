import { Router } from "express";
import AuthMiddleware from "../../shared/middlewares/auth.middleware";
import UsuariosController from "./usuario.controller";

const UsuariosRouter = Router();

UsuariosRouter.post('/cadastrarusuario', AuthMiddleware.verifyToken, AuthMiddleware.verifyAdm, UsuariosController.cadastrarUsuario)
UsuariosRouter.get('/buscardadosusuario/:id_usuario', AuthMiddleware.verifyToken, UsuariosController.buscarDadosUsuario);
UsuariosRouter.put('/alterardados/:id_usuario', AuthMiddleware.verifyToken, AuthMiddleware.verifyAdm, UsuariosController.alterarDadosUsuario)

export default UsuariosRouter;