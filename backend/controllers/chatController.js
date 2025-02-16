const Chat = require("../models/Chat");

exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        const senderId = req.user.id;

        const newMessage = await Chat.create({ senderId, receiverId, message });

        res.status(201).json({ message: "Message sent", newMessage });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const messages = await Chat.findByChatId(chatId);

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
