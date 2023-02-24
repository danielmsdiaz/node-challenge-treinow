import { Router } from "express";
import * as alunoFunctions from "../controllers/alunoController";
import { Auth } from "../middlewares/auth";

const routes = Router();
routes.post("/personal/:personal_id/rating", Auth.aluno, alunoFunctions.ratePersonal);

export default routes;