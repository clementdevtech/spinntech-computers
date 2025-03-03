const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const app = require('./app');
const cookieParser = require("cookie-parser");


const WebSocket = require('ws');

dotenv.config();

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGINS = [
    "http://localhost:3000",
    "https://spinntech-computers-production.up.railway.app"
];

const server = express();

// CORS Configuration
server.use(cors({
    origin: (origin, callback) => {
        if (!origin || CLIENT_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

server.use(morgan('dev'));
server.use(express.json());
server.use(cookieParser());
server.use('/', app);

// Start HTTP Server
const httpServer = server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// WebSocket Server
const wss = new WebSocket.Server({ server: httpServer });

wss.on('connection', (ws, req) => {
    const origin = req.headers.origin;
    if (!CLIENT_ORIGINS.includes(origin)) {
        console.log(`Blocked WebSocket connection from: ${origin}`);
        ws.close();
        return;
    }
    
    console.log(`WebSocket connection established from: ${origin}`);
    
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Echo: ${message}`);
    });
    
    ws.on('close', () => {
        console.log("WebSocket connection closed");
    });
});
