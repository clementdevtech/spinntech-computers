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

// Create HTTP server
const server = http.createServer(app);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000", "https://spinntech-computers-production.up.railway.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// Initialize WebSocket
initSocket(server);

// Start Server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
