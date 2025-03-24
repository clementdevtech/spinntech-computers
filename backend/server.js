const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const app = require("./app");
const cookieParser = require("cookie-parser");
const http = require("http");
const { initSocket } = require("./services/socket");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create Express App
const server = express();

// Middleware
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());

// ✅ FIX: Apply CORS to `server`
server.use(cors({
    origin: ["http://localhost:3000", "https://spinntech-computers-production.up.railway.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

server.use("/", app);

const httpServer = http.createServer(server);
initSocket(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
