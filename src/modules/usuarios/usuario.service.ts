import { AppError } from "../../shared/middlewares/err.middleware";
import { CadastroUsuarioDto } from "./usuario.dto";
import UsuarioModel from "./usuario.model";
import bcrypt from 'bcrypt';
import { DadosCadastroUsuario } from "./usuario.type";
import pool from "../../database/connection";
import CorretoresModel from "../corretores/corretores.model";

const UsuarioService = {

    cadastrarUsuario: async (dadosUsuario: CadastroUsuarioDto, id_empresa: number) => {
        //verifica se existe o usuario pelo email
        const usuario = await UsuarioModel.buscaUsuarioEmail(dadosUsuario.email);

        if(usuario) throw new AppError("Email já cadastrado!", 500);

        //verifica se senha é igual a confirmacao
        if(dadosUsuario.senha !== dadosUsuario.confirmacaoSenha) throw new AppError("Senhas não coincidem", 500);

        //gera hash da senha
        const hash_senha = await bcrypt.hash(dadosUsuario.senha, 10);

        const {confirmacaoSenha, senha, ...dados} = dadosUsuario;

        //gerar novo objeto de cadastro do usuario
        const newDadosUser: DadosCadastroUsuario = {...dados, hash_senha}

        const connection = await pool.getConnection();

        try{
            //cadastra usuario
            const id_user = await UsuarioModel.cadastrarUsuario(newDadosUser, id_empresa, connection);

            //cadastrar usuario pela role
            const role = dadosUsuario.id_role;

            //8 - proprietario
            //7 - cliente
            //6 e 5 corretor
            switch(role){
                case 5:
                case 6:
                    await CorretoresModel.cadastrarCorretor(Number(id_user), connection);
                    break;
                case 7:
                    break;
                case 8:
                    break;
                default:
                    throw new AppError("Role inválida!", 500);
            }


        }catch(error: any){
            connection.rollback();
            throw new AppError(`Erro ao cadastrar usuário: ${error.message}`, 500);
        }finally{
            connection.release()
        }
    }

}

export default UsuarioService;