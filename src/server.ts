import express, { json } from "express";
import dotenv from "dotenv"
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import personalRoutes from "./routes/personalRoutes"
import alunoRoutes from "./routes/alunoRoutes";

dotenv.config();
const server = express();

server.locals.token = "";

server.use(cors());
server.use(express.urlencoded({extended: true}));
server.use(json());

server.use("/api", userRoutes, personalRoutes, alunoRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Escutando a porta ${process.env.PORT}`);
});

export default server