import { NextFunction, Response, Request } from "express"

import UsuarioService from "./usuario.service"
import { MyRequest } from "../../shared/types/request";
import { CadastroUsuarioDto, DadosAlterar } from "./usuario.type";
import { AppError } from "../../shared/middlewares/err.middleware";

const UsuariosController = {

    cadastrarUsuario: async (req: MyRequest, res: Response, next: NextFunction) => {
        try{
            const dadosUsuario: CadastroUsuarioDto = req.body;

            if(!dadosUsuario) throw new AppError("Dados inválidos!", 500);

            const id_empresa = req.id_empresa;

            await UsuarioService.cadastrarUsuario(dadosUsuario, Number(id_empresa));

            res.status(200).json({mensagem: "Usuário cadastrado com sucesso!"});
        }catch(error){
            next(error)
        }
    },

    buscarDadosUsuario: async (req: MyRequest, res: Response, next: NextFunction) => {
        try{
            const id_empresa = req.id_empresa;
            const id_usuario = req.params.id_usuario

            const dados = await UsuarioService.buscarDadosUsuario(Number(id_usuario), Number(id_empresa));

            res.status(200).json(dados);
        }catch(error){
            next(error)
        }
    },

    alterarDadosUsuario: async (req: MyRequest, res: Response, next: NextFunction) => {
        try{
            const dados: DadosAlterar = req.body;
            if(!dados) throw new AppError("Campo dados vazio!", 500);

            const id_usuario = req.params.id_usuario;
            const id_empresa = req.id_empresa

            console.log(dados)

            await UsuarioService.alterarDadosUsuario(dados, Number(id_usuario), Number(id_empresa))

            res.status(200).json({mensagem: "Dados alterados!"});
        }catch(error){
            next(error)
        }
    }

}

export default UsuariosController