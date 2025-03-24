const { Server } = require("socket.io");

let io;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:3000", "https://spinntech-computers-production.up.railway.app"],
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("sendMessage", (message) => {
            console.log(`Message received: ${message}`);
            io.emit("receiveMessage", message); // Broadcast message to all clients
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

function getIo() {
    if (!io) {
        throw new Error("Socket.io has not been initialized!");
    }
    return io;
}

module.exports = { initSocket, getIo };
