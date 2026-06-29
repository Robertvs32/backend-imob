import { NextFunction, Response, Request } from "express"
import { Usuario } from "./usuario.type"
import UsuarioService from "./usuario.service"
import { MyRequest } from "../../shared/types/request";

const UsuarioController = {

    cadastrarUsuario: async (req: MyRequest, res: Response, next: NextFunction) => {
        try{
            const dadosUsuario: Usuario = req.body;
            const id_empresa = req.id_empresa;

            await UsuarioService.cadastrarUsuario(dadosUsuario);

        }catch(error){
            next(error)
        }
    }

}