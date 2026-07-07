import { NextFunction, Response, Request } from "express"

import UsuarioService from "./usuario.service"
import { MyRequest } from "../../shared/types/request";
import { CadastroUsuarioDto } from "./usuario.dto";
import { AppError } from "../../shared/middlewares/err.middleware";

const UsuariosController = {

    cadastrarUsuario: async (req: MyRequest, res: Response, next: NextFunction) => {
        try{
            const dadosUsuario: CadastroUsuarioDto = req.body;

            if(!dadosUsuario) throw new AppError("Dados inválidos!", 500);

            const id_empresa = req.id_empresa;

            await UsuarioService.cadastrarUsuario(dadosUsuario, Number(id_empresa));

            res.status(200).json({dadosUsuario, id_empresa});
        }catch(error){
            next(error)
        }
    }

}

export default UsuariosController