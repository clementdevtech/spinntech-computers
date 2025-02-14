// server.js (Entry point)
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const app = require('./app');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = express();
server.use(morgan('dev'));
server.use(cors());
server.use(express.json());
server.use('/', app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});