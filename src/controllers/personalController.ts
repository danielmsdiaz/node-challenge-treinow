import { Request, Response } from "express";
import { Training } from "../models/Training";

export const registerTraining = (req: Request, res: Response) => {
    const training: Training = {duration: req.body.duration, muscle: req.body.muscle, date: req.body.date};
    res.send("PEGOU!")
}



