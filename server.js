import express from "express";
import http from "http";
import next from "next";
import connectDB from "./lib/db.js";
import initSocket from "./lib/socket.js";

const port = process.env.PORT || 10000;
const dev = false;

const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

await nextApp.prepare();

const app = express();
const server = http.createServer(app);

await connectDB();

// ✅ ONLY THIS
initSocket(server);

app.use((req, res) => handle(req, res));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
