import { Router } from "express";
import AuthController from "./auth.controller";

const AuthRouter = Router()

AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/logout', AuthController.logout);
AuthRouter.post('/refresh', AuthController.refresh);

export default AuthRouter;