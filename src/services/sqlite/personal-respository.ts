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
    }
}

export default PersonalRepository
