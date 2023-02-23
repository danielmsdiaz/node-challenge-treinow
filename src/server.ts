import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import personalRoutes from "./routes/personalRoutes"

dotenv.config();
const server = express();
//gambiarra para funcionar a aplicação
server.locals.token = "";

server.use(cors());
server.use(express.urlencoded({extended: true}));

server.use("/api", userRoutes, personalRoutes);

server.listen(process.env.PORT);

export default server