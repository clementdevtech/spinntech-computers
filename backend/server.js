// server.js (Entry point)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const app = require('./app');


dotenv.config();

const PORT = process.env.PORT || 5000;

const server = express();

server.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
server.use(morgan('dev'));
server.use(express.json());
server.use('/', app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});