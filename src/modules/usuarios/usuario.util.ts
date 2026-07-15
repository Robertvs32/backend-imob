import { AppError } from "../../shared/middlewares/err.middleware";
/*
  RECEBE O OBJETO, DEVOLVE O UPDATE DINAMICO DO SQL COM CAMPOS DO OBJETO E ARRAY COM VALORES
*/
export const updateDinamicoSql = (objeto: any, tabela: string): {sql: string, array: any[]}  => {

    const arrayChaves = Object.keys(objeto)

    //ARRAY COM VALORES QUE SERAO PREENCHIDOS
    const arrayValores = Object.values(objeto)

    let campoSQL = '';

    //PREENCHER OS CAMPOS QUE SERAO ALTERADOS
    arrayChaves.forEach((chave, index) => {
        if(index == 0){
            campoSQL += `${chave} = ?`;
        }
        else{
            campoSQL += `, ${chave} = ?`;
        }
    })

    const sql = `
        UPDATE ${tabela}
        SET 
            ${campoSQL}
    `

    return{
        sql,
        array: arrayValores
    }

}

export const verificaCamposObjeto = (objeto: any, camposPermitidos: any[]) => {
    const camposObjeto = Object.keys(objeto)

    camposObjeto.forEach(campo => {
        if(!camposPermitidos.includes(campo)){
            throw new AppError(`Campo ${campo}, inválido!`, 500)
        }
    })
}