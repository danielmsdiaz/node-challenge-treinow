import { Router } from "express";
import * as personalFunctions from "../controllers/personalController";
import { Auth } from "../middlewares/auth";

const routes = Router();
routes.post("/personal/workout", Auth.personal, personalFunctions.registerTraining);
routes.post("/personal/student", Auth.personal, personalFunctions.registerAluno)

export default routes;