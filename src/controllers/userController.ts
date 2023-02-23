import { Request, Response } from "express";
import { User } from "../models/User";
import UserRepository from "../services/sqlite/user-repository";

export const pong = (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const registerUser = async (req: Request, res: Response) => {
    const obj: User = { name: "Daniel", email: "saddas", document: "123", type: true, password: "123abc" }

    try {
        UserRepository.criar(obj, (id) => {
            if (id) {
                res.status(201).location(`/users/${id}`).send();
            } else {
                console.log("caiu aqui");
                res.status(400).send()
            }
        })
    } catch (error: any) {
        //res.status(error.response.status)
        return res.send(error.message);
    }
}

