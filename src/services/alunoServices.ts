import database from "./sqlite/db";

export const checkIfHasPersonal = (loggedAluno: number, cb: (row?: number) => void) => {
    database.get("SELECT personal_id FROM alunos WHERE user_id = ?", [loggedAluno], (err, row) => {
        if (err) {
            console.log(err);
        }
        else if (!row) {
            cb(row)
        }
        else {
            cb(row.personal_id);
        }
    });
}

export const checkIfHasAlreadyRated = (loggedAluno: number, cb: (row?: any) => void) => {
    database.get("SELECT * FROM avaliacao_personal WHERE id_aluno = ?", [loggedAluno], (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            cb(row);
        }
    });
}

export const checkMyPersonal = (loggedAluno: number, cb: (row?: any) => void) => {
    database.get("SELECT * FROM alunos WHERE user_id = ?", [loggedAluno], (err, rowAluno) => {
        if (err) {
            console.log(err);
        }
        else if (rowAluno.personal_id) {
            checkIfMyPersonalHasATraining(parseInt(rowAluno?.personal_id), (rowTreinos) => {
                if (rowTreinos) {
                    cb(rowTreinos);
                }
                else {
                    cb(rowTreinos)
                }
            });
        }
        else {
            cb(rowAluno?.personal_id);
        }
    });
}

export const checkIfMyPersonalHasATraining = (idPersonal: number, cb: (row?: any) => void) => {
    database.all("SELECT * FROM treinos WHERE id_personal = ?", [idPersonal], (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            cb(row);
        }
    });
}

export const checkAllAlunoInteractions = (idAluno: number, cb: (row?: any) => void) => {

    deleteRows("user_id", idAluno, "alunos", (result) => {
        if(result){
            console.log(result);
        }
        else{
            console.log(`Aluno deletado!`);
        }
    })

    database.all("SELECT * FROM horarios_treino WHERE id_aluno = ?", [idAluno], (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            if (Array.isArray(row) && row.length) {
                row.forEach(treino => {
                    deleteRows("id", treino.id, "horarios_treino", (result) => {
                        if(result){
                            console.log(result);
                        }
                        else{
                            console.log(`Treino ${treino.id} deletado!`);
                        }
                    })
                });
                
            }
            else {
                console.log("Aluno não possui treinos cadastrados");
            }
        }
    });

    database.get("SELECT * FROM avaliacao_personal WHERE id_aluno = ?", [idAluno], (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            if (row) {
                deleteRows("id", row.id, "avaliacao_personal", (result) => {
                    if(result){
                        console.log(result);
                    }
                    else{
                        console.log("Avaliacão deletada!");
                    }
                });
            }
            else {
                console.log("Aluno não possui avaliações de personais");
            }
        }
    });

    database.get("SELECT * FROM personais_alunos WHERE id_aluno = ?", [idAluno], (err, row) => {
        if (err) {
            console.log(err);
        }
        else {
            if (row) {
                deleteRows("id", row.id, "personais_alunos", (result) => {
                    if(result){
                        console.log(result);
                    }
                    else{
                        console.log("Contrato deletado!");
                    }
                });
            }
            else {
                console.log("Aluno não possui personais");
            }
        }
    });

    cb();
}

export const deleteRows = (column: string, id: number, tabela: string, cb: (result?: any) => void) => {

    const sql = `DELETE FROM ${tabela} WHERE ${column} = ?`
    const params = [id];

    database.run(sql, params, function (_err) {
        cb(_err);
    });
}






