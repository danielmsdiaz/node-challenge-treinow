import database from './db'

const AlunoRepository = {
    avaliar: (rate: number, idPersonal: number, callback: (result: any) => void) => {
        const sql = 'INSERT INTO avaliacao_personal (id_personal, nota) VALUES (?, ?)';
        const params = [idPersonal, rate];
        database.run(sql, params, function (_err) {
            callback(this)
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
