import * as bcrypt from 'bcrypt';

const gerarHash = async (senha) => {
    const hashSenha = await bcrypt.hash(senha, 10);
    console.log(hashSenha);
}

gerarHash('12344321');

//GERAR HASH DE SENHA PRA CRIAR O DIRETOR GERAL, QUE NAO TEM ENDPOINT DE CADASTRO