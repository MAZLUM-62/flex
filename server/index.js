import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";

import onSocket from "./src/utils/socket.js";
import tttpvpSocket from "./src/controllers/tttpvp.js"
import rouletteController from "./src/controllers/rouletteController.js";

import{} from './src/config/database.js';
import path from "path";
import router from './src/routers/pages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app); 


app.use("/", router);
app.use(express.static(path.join(__dirname, "..", "client")));



const io = new Server(httpServer);
onSocket(io);
tttpvpSocket(io)
rouletteController(io);

const port = process.env.PORT || 8080;
httpServer.listen(port, () => console.log(`Listening on port ${port}...`));

