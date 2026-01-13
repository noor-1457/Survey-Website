import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import connectDB from "./config/db.js";


import voteSocket from "./sockets/voteSocket.js";

connectDB();



const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL }
});

voteSocket(io);

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
