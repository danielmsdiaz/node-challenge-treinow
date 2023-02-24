import { Request, Response } from "express";
import { Aluno } from "../models/Aluno";
import { Training } from "../models/Training";
import { checkAlunoPersonal, linkAlunoToPersonal } from "../services/personalServices";
import PersonalRepository from "../services/sqlite/personal-respository";

export const registerTraining = (req: Request, res: Response) => {
    const training: Training = { duration: req.body.duration, muscle: req.body.muscle, date: req.body.date, id_personal: res.locals.id };
    PersonalRepository.criarTreino(training, (id) => {
        res.status(200).send(`Treino criado: ${id}`);
    });
}

export const registerAluno = (req: Request, res: Response) => {
    const aluno: Aluno = { user_id: req.body.id, personal_id: res.locals.id };
    checkAlunoPersonal(aluno, (personal) => {
        if (!personal) {
            PersonalRepository.vincularAlunoPersonal(aluno, (update) => {
                if (update && update > 0) {
                    linkAlunoToPersonal(aluno, (result) => {
                        if(result){
                            res.status(200).send("Contrato com o personal realizado com sucesso!");
                        }
                    });
                }
                else {
                    res.status(400).json({ ERROR: "Não foi possível realizar o contrato com o personal!" })
                }
            });
        }
        else{
            res.status(400).json({ ERROR: "Esse aluno já possui um personal cadastrado!" })
        }
    });
}

export const listMyTrainings = (req: Request, res: Response) => {
    const authPersonal = res.locals.id;
    PersonalRepository.meusTreinos(authPersonal, (treinos) => {
        if(treinos){
            res.status(200).send(treinos);
        }
    });
}



