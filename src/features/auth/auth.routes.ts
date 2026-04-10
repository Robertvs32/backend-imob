import { Router } from "express";
import AuthController from "./auth.controller.js";

const AuthRouter = Router();

AuthRouter.post('/login', AuthController.login);

export default AuthRouter;