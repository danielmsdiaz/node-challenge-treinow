import { Request, Response } from "express";
import { User } from "../models/User";
import UserRepository from "../services/sqlite/user-repository";
import { checkIfExists, checkUserFields, checkUserType, validateBody } from "../services/userServices";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import server from "../server"


dotenv.config();

export const pong = (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const registerUser = (req: Request, res: Response) => {
    const obj: User = { name: req.body.name, email: req.body.email, document: req.body.document, type: req.body.type, password: req.body.password };

    try {
        if (obj) {
            checkUserFields(obj, (field) => {
                if (typeof field === "string") {
                    res.send(`Campo ${field} undefined!`);
                }
                else if (typeof field === "boolean") {
                    validateBody(obj, (arr) => {
                        if (arr && arr.length) {
                            res.json({ ERROR: arr })
                        }
                        else {
                            UserRepository.criar(obj, (id) => {
                                if (id && id > 0) {
                                    res.status(201).location(`/users/${id}`).send("Usuario criado com sucesso!");
                                }
                                else if (id && id < 0) {
                                    res.send("Email ou CPF já existente!");
                                }
                                else {
                                    res.status(400).send("Ocorreu algum erro!")
                                }
                            })
                        }

                    })
                }
            });
        }
    } catch (error: any) {
        //res.status(error.response.status)
        return res.send(error.message);
    }
}

export const logUser = (req: Request, res: Response) => {
    const login: { email: string, password: string } = { email: req.body.email, password: req.body.password };
    try {
        if (login) {
            if (!login.email) {
                res.json({ERROR: "email inválido!"});
            }
            else if (!login.password) {
                res.json({ERROR: "senha inválida!"});
            }
            else {
                UserRepository.logar(login, (id) => {
                    if (id) {
                        checkUserType(id, (type) => {
                            if (type) {
                                const token = JWT.sign(
                                    { id: id, email: login.email, password: login.password, type: type },
                                    process.env.JWT_SECRET_KEY as string,
                                    { expiresIn: "2h" });

                                server.locals.token = `Bearer ${token}`;
                                res.json({ status: "Login realizado com sucesso!", token })
                            }
                        });
                    }
                    else {
                        res.json({ERROR: "Usuário ou senha incorretos!"});
                    }
                })
            }
        }
    } catch (error: any) {
        //res.status(error.response.status)
        return res.send(error.message);
    }
}


