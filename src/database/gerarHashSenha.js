import * as bcrypt from 'bcrypt';

const gerarHash = async (senha) => {
    const hashSenha = await bcrypt.hash(senha, 10);
    console.log(hashSenha);
}

gerarHash('12344321');