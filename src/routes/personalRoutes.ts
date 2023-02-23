import { Router } from "express";
import * as personalFunctions from "../controllers/personalController";
import { Auth } from "../middlewares/auth";

const routes = Router();
routes.post("/personal/workout", Auth.personal ,personalFunctions.registerTraining);

export default routes;