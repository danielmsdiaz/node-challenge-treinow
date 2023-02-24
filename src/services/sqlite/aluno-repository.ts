import { checkIfHasAlreadyRated } from '../alunoServices';
import database from './db'

const AlunoRepository = {
    avaliar: (aluno: number, rate: number, idPersonal: number, callback: (msg: string) => void) => {
        checkIfHasAlreadyRated(aluno, (row) => {
            if (!row) {
                const sql = 'INSERT INTO avaliacao_personal (id_personal, nota, id_aluno) VALUES (?, ?, ?)';
                const params = [idPersonal, rate, aluno];
                database.run(sql, params, function (_err) {
                    callback("atribuida");
                });
            }
            else {
                const sql = 'UPDATE avaliacao_personal SET nota = ? WHERE id_aluno = ?';
                const params = [rate, aluno];
                database.run(sql, params, function (_err) {
                    callback("atualizada");
                });
            }
        });
    },

    // deletarConta: (loggedAluno: number, callback: (result: any) => void) => {
    //     const sql = 'INSERT INTO avaliacao_personal (id_personal, nota) VALUES (?, ?)';

    //     const params = [idPersonal, rate];
    //     database.run(sql, params, function (_err) {
    //         callback(this)
    //     });
    // }
}

export default AlunoRepository
