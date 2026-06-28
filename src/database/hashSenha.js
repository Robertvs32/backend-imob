import * as bcrypt from 'bcrypt'

const senha = await bcrypt.hash('osvaldo1234', 10);

console.log(senha)