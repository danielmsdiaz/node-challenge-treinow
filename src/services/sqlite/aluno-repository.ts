import { RunResult } from 'sqlite3';
import { checkAllAlunoInteractions, checkIfHasAlreadyRated, checkMyPersonal } from '../alunoServices';
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

    registerMyTraining: (aluno: number, training: { date: Date, horario: string, treino: number }, callback: (msg: string | RunResult) => void) => {
        checkMyPersonal(aluno, (res) => {
            if (res !== undefined) {
                if (res === null) {
                    callback("Esse aluno não pode registrar um treino sem personal!");
                }
                else if (Array.isArray(res)) {
                    if (!res.length) {
                        callback("O personal desse aluno não possui nenhum treino cadastrado!");
                    }
                    else {
                        let tempArr: boolean = false;
                        
                        res.forEach(treino => {
                            if (treino.id == training.treino) {
                                tempArr = true;
                                const sql = 'INSERT INTO horarios_treino (id_aluno, id_treino, horario, date) VALUES (?, ?, ?, ?)';
                                const params = [aluno, training.treino, training.horario, training.date];
                                database.run(sql, params, function (_err) {
                                    callback(this);
                                    return;
                                });
                            }
                        });

                        if (!tempArr) {
                            callback("Esse treino não pertence ao seu personal!");
                        }
                    }
                }
            }
        });
    },

    deletarConta: (loggedAluno: number, callback: (result: any) => void) => {
        const sql = 'DELETE FROM alunos WHERE user_id = ?'
        const params = [loggedAluno];

        database.run(sql, params, function (_err) {
            if (_err) {
                callback(_err);
            }
            else {
                checkAllAlunoInteractions(loggedAluno, () => {
                    callback(true);
                });
            }
        });
    }
}

export default AlunoRepository
