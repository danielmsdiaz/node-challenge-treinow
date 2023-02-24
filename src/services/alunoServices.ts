import database from "./sqlite/db";

export const checkIfHasPersonal = (loggedAluno: number, cb: (row?: number) => void) => {
    database.get("SELECT personal_id FROM alunos WHERE user_id = ?", [loggedAluno], (err, row) => {
        if(err){
            console.log(err);
        }
        else if(!row){
            cb(row)
        }
        else{
            cb(row.personal_id);
        }
    });
}

export const checkIfHasAlreadyRated = (loggedAluno: number, cb: (row?: any) => void) => {
    database.get("SELECT * FROM avaliacao_personal WHERE id_aluno = ?", [loggedAluno], (err, row) => {
        if(err){
            console.log(err);
        }
        else{
            cb(row);
        }
    });
}



