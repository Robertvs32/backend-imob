import { AppError } from "../../shared/middlewares/err.middleware";
import { CadastroUsuarioDto, DadosAlterar } from "./usuario.type";
import UsuarioModel from "./usuario.model";
import bcrypt from 'bcrypt';
import { DadosCadastroUsuario, RetornoDadosUsuario, RetornoDadosGeral, RetornoDadosCorretor} from "./usuario.type";
import pool from "../../database/connection";
import CorretoresModel from "../corretores/corretores.model";
import { verificaCamposObjeto } from "./usuario.util";

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
            await connection.beginTransaction()
            //cadastra usuario
            const id_user = await UsuarioModel.cadastrarUsuario(newDadosUser, id_empresa, connection);

            //cadastrar usuario pela role
            const role = dadosUsuario.id_role;

            switch(role){
                //CADASTRA DADOS CORRETOR
                case 5:
                case 6:
                    await CorretoresModel.cadastrarCorretor(Number(id_user), connection);
                    break;
                //CADASTRA DADOS USUARIO
                case 7:
                case 8:
                    await UsuarioModel.criarDadosUsuario(Number(id_user), connection)
                    break;
                default:
                    throw new AppError("Role inválida!", 500);
            }

            await connection.commit()
        }catch(error: any){
            await connection.rollback();
            throw new AppError(`Erro ao cadastrar usuário: ${error.message}`, 500);
        }finally{
            connection.release()
        }
    },

    buscarDadosUsuario: async (id_usuario: number, id_empresa: number): Promise<RetornoDadosGeral | RetornoDadosUsuario | RetornoDadosCorretor> => {

        try{
            //BUSCA AS INFORMACOES DO USUARIO
            const infosUsuario = await UsuarioModel.buscaInfosUsuarioId(id_usuario);

            if(!infosUsuario) throw new AppError("Usuário não encontrado!", 500);
            if(infosUsuario.id_empresa !== id_empresa) throw new AppError("Busca negada!", 500);

            let dados: RetornoDadosGeral | RetornoDadosCorretor | RetornoDadosUsuario = {geral: infosUsuario}

            //BUSCA AS INFORMACOES DA ROLE
            switch(infosUsuario.id_role){
                //BUSCA DADOS CORRETOR
                case 5:
                case 6:
                    //busca dados corretor
                    const dadosCorretor = await CorretoresModel.buscaDadosCorretor(id_usuario);
                    if(!dadosCorretor) throw new AppError("Dados do corretor não foram encontrados!", 500);
                    dados = {...dados, corretor: { ...dadosCorretor}}

                    return dados;
                case 7:
                case 8:
                    //busca dados usuario
                    const dadosUsuario = await UsuarioModel.buscaDadosUsuario(id_usuario);
                    if(!dadosUsuario) throw new AppError("Dados do usuário não foram encontrados!", 500);
                    dados = {...dados, usuario: {...dadosUsuario}}

                    return dados
                default:
                    return dados
            }
        }catch(error){
            throw error;
        }
    },

    alterarDadosUsuario: async (dados: DadosAlterar, id_usuario: number, id_empresa: number) => {
        const connection = await pool.getConnection()

        try{
            await connection.beginTransaction();

            //VERIFICA SE O USUARIO É DA EMPRESA
            const usuario = await UsuarioModel.buscaInfosUsuarioId(id_usuario);
            if(usuario?.id_empresa != id_empresa) throw new AppError("Usuario nao pertence a empresa!", 500);

            //ALTERA OS DADOS
            if(dados.geral){
                //ATUALIZA DADOS GERAL USUARIO PASSANDO O OBJETO GERAL
                const dadosGeral = {...dados.geral}
                verificaCamposObjeto(dadosGeral, ["nome", "email", "telefone", "cep", "numero", "cidade", "estado"]);
                await UsuarioModel.alteraDadosGeral(dadosGeral, id_usuario, connection)
            }

            if(dados.corretor){
                //ATUALIZA DADOS CORRETOR

                const dadosCorretor = {...dados.corretor}
                verificaCamposObjeto(dadosCorretor, ["creci"]);
                await UsuarioModel.alteraDadosCorretor(dadosCorretor, id_usuario, connection)
            }

            if(dados.usuario){
                //ATUALIZA DADOS USUARIO
                const dadosUsuario = {...dados.usuario}
                verificaCamposObjeto(dadosUsuario, ["rg", "cpf", "renda_bruta", "estado_civil", "profissao"]);
                await UsuarioModel.alteraDadosUsuario(dadosUsuario, id_usuario, connection)
            }

            await connection.commit()
        }catch(error: any){
            await connection.rollback()
            throw new AppError(`Erro ao atualizar dados! - ${error.message}`, 500)
        }finally{
            connection.release()
        }
    }

}

export default UsuarioService;