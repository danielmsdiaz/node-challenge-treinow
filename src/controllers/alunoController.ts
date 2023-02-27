import { Request, Response } from "express";
import { checkIfHasPersonal, checkIfItsAPersonal } from "../services/alunoServices";
import AlunoRepository from "../services/sqlite/aluno-repository";
import { closeAccount } from "../services/userServices";
import server from "../server";
import { stat } from "fs";


export const registerMyTraining = (req: Request, res: Response) => {
    const loggedAluno = res.locals.id;
    
    const training: { date: Date, horario: string, treino: any } = { date: req.body.date, horario: req.body.horario, treino: req.body.treino };
    
    if (loggedAluno && training.date && training.horario && training.treino) {
        AlunoRepository.registerMyTraining(loggedAluno, training, (resp) => {
            if (typeof resp == "string") {
                res.json({ ERROR: resp })
            }
            else {
                res.json({ SUCESSO: `O aluno de ID: ${loggedAluno} iniciou um treino as ${training.horario} horas em ${training.date}` });
            }
        });
    }
    else{
        res.status(400).json({ERROR: "Ocorreu um erro. Verifique as keys!"});
        
    }
}

export const deleteAccount = (req: Request, res: Response) => {
    const loggedAluno = res.locals.id;
    AlunoRepository.deletarConta(loggedAluno, (result) => {
        if (result) {
            closeAccount(loggedAluno, (closed) => {
                if (closed == true) {
                    server.locals.token = "";
                    res.json({ Sucesso: `A conta do aluno de ID: ${loggedAluno} foi apagada!` })
                }
                else {
                    res.json({ ERROR: "Ocorreu algum erro!" })
                }
            })
        }
        else {
            res.json({ ERROR: "Ocorreu algum erro!" })
        }
    })
}


export const ratePersonal = (req: Request, res: Response) => {
    const loggedAluno = res.locals.id;
    const rate = req.body.rate;
    let idPersonal = parseInt(req.headers.personal_id as string);

    checkIfItsAPersonal(idPersonal, (row) => {
        if (row) {
            if (loggedAluno && rate && idPersonal) {
                if (rate > 5) {
                    res.json({ ERROR: "A nota só pode ser de 0 a 5" });
                }
                else if(row == 0){
                    res.json({ ERROR: "Não é possivel avaliar um aluno" });
                }
                else {
                    checkIfHasPersonal(loggedAluno, (id) => {
                        if (id) {
                            if (id == idPersonal) {
                                AlunoRepository.avaliar(loggedAluno, rate, idPersonal, (msg) => {
                                    res.json({ Avaliação: `Nota ${rate} ${msg} ao personal de ID: ${idPersonal}` });
                                });
                            }
                            else {
                                res.json({ ERROR: "É necessário ser aluno desse personal para poder avaliá-lo" });
                            }
                        }
                        else {
                            res.json({ ERROR: "Não existe nenhum personal vinculado!" });
                        }
                    });
                }
            }
            else {
                res.json({ ERROR: "Houve algum erro na requisição! Verifique o nome das keys!" })
            }
        }
        else {
            res.status(400).json({ ERROR: "Não existe um usuário com esse id!" })
        }
    })
}

