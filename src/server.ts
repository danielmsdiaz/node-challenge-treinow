import express from "express";
import dotenv from "dotenv"
import cors from "cors";

dotenv.config();
const server = express();

server.use(cors());
server.listen(process.env.PORT);