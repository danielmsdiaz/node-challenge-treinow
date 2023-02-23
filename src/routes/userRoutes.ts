import { Router } from "express";
import * as userFunctions from "../controllers/userController";

const routes = Router();
routes.get("/ping", userFunctions.pong);
routes.post("/register", userFunctions.registerUser);

export default routes;