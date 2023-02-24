import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken"
import dotenv from "dotenv";
import server from "../server";

dotenv.config();

export const Auth = {
    personal: (req: Request, res: Response, next: NextFunction) => {
        let sucess = false;
        const authorization = server.locals.token;
    
        if(authorization){
            const [authType, token] = authorization.split(' ');
            if(authType === "Bearer"){
                try{
                    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string);
                    if(decoded){
                        if (decoded instanceof Object && 'type' in decoded) {
                            if(decoded.type == 1){
                                res.locals.id = decoded.id; 
                                sucess = true;
                            }
                          }
                    }
                }
                catch(err){

                }
            }
        }
        else{
            res.json({ERROR: "User não logado!"});
            return;
        }

        if(sucess){
            next();
        }
        else{
           res.status(401).send("Erro na autenticação!") 
        }
    },

    aluno:(req: Request, res: Response, next: NextFunction) => {
        let sucess = false;
        const authorization = server.locals.token;
    
        if(authorization){
            const [authType, token] = authorization.split(' ');
            if(authType === "Bearer"){
                try{
                    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string);
                    if(decoded){
                        if (decoded instanceof Object && 'type' in decoded) {
                            if(decoded.type == 0){
                                res.locals.id = decoded.id; 
                                sucess = true;
                            }
                          }
                    }
                }
                catch(err){

                }
            }
        }
        else{
            res.json({ERROR: "User não logado!"});
            return;
        }

        if(sucess){
            next();
        }
        else{
           res.status(401).send("Erro na autenticação!") 
        }
    }

}