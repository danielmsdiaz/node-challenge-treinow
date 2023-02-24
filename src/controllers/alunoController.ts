import { Request, Response } from "express";
import { checkIfHasPersonal } from "../services/alunoServices";
import AlunoRepository from "../services/sqlite/aluno-repository";


export const registerAluno = (req: Request, res: Response) => {  
}

export const listMyTrainings = (req: Request, res: Response) => {
}


export const ratePersonal = (req: Request, res: Response) => {
    const loggedAluno = res.locals.id;
    const rate = req.body.rate;
    let idPersonal = parseInt(req.headers.personal_id as string);
    
    if(loggedAluno && rate && idPersonal){
        if(rate > 5){
            res.json({ERROR: "A nota só pode ser de 0 a 5"});
        }
        else{
            checkIfHasPersonal(loggedAluno, (id) => {
                if(id){
                    if(id == idPersonal){
                        AlunoRepository.avaliar(rate, idPersonal, (result) => {
                            res.json({Avaliação: `Nota ${rate} atribuida ao personal de ID: ${idPersonal}`});
                        });
                    }
                    else{
                        res.json({ERROR: "É necessário ser aluno desse personal para poder avaliá-lo"});
                    }
                }
                else{
                    res.json({ERROR: "Não existe nenhum personal vinculado!"});
                }    
            });
        }
    }
    else{
        res.json({ERROR: "Houve algum erro na requisição! Verifique o nome das keys!"})
    }

}

