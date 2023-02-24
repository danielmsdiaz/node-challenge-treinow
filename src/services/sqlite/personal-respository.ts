import { Aluno } from '../../models/Aluno';
import { Training } from '../../models/Training'
import database from './db'

const PersonalRepository = {
    criarTreino: (training: Training, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO treinos (duration, muscle, date, id_personal) VALUES (?, ?, ?, ?)';
        const params = [training.duration, training.muscle, training.date, training.id_personal];
        database.run(sql, params, function (_err) {
            callback(this?.lastID)
        });
    },

    vincularAlunoPersonal: (aluno: Aluno, callback: (res?: number) => void) => {
        const sql = 'UPDATE alunos SET personal_id = ? WHERE user_id = ?';
        const params = [aluno.personal_id, aluno.user_id];

        database.run(sql, params, function (_err) {
            callback(this?.changes)
        });
    },

    meusTreinos: (id: number, callback: (row?: string[]) => void) => {
        database.all("SELECT * FROM treinos WHERE id_personal = ?", [id], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            else {
                callback(row);
            }
        });
    }
}

export default PersonalRepository
