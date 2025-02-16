const { Chat, User } = require('../models');

// Send a message
exports.sendMessage = async (senderId, receiverId, message) => {
    try {
        const chat = await Chat.create({ senderId, receiverId, message });
        return chat;
    } catch (error) {
        console.error("Chat error:", error.message);
        throw new Error("Failed to send message.");
    }
};

// Get chat history between two users
exports.getChatHistory = async (userId1, userId2) => {
    try {
        return await Chat.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 }
                ]
            },
            order: [['createdAt', 'ASC']]
        });
    } catch (error) {
        console.error("Chat history error:", error.message);
        throw new Error("Failed to retrieve chat history.");
    }
};
