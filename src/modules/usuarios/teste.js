import { updateDinamicoSql } from "./usuario.util.ts";

const {sql, array} = updateDinamicoSql(
    {"creci": "22dad"},
    "WHERE id_corretor = ?"
);

console.log(sql)
console.log(array);