import { Aluno } from "../models/Aluno";
import { Training } from "../models/Training";
import database from "./sqlite/db";

export const checkAlunoPersonal = (aluno: Aluno, cb: (row?: string) => void) => {
    database.get("SELECT * FROM alunos WHERE user_id = ?", [aluno.user_id], (err, row) => {
        if (err) {
            console.error(err.message);
        } else if (!row) {
            cb(row);
            console.log('Não existe registro com o valor informado.');
        } else {
            cb(row?.personal_id);
            console.log('Existe um registro com o valor informado:', row);
        }
    });
}

export const linkAlunoToPersonal = (aluno: Aluno, cb: (row?: any) => void) => {
        const sql = 'INSERT INTO personais_alunos (id_personal, id_aluno) VALUES (?, ?)';
        const params = [aluno.personal_id, aluno.user_id];

        database.run(sql, params, function (_err) {
            cb(this)
        });
}



