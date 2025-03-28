const db = require("../db");
const { io } = require("../services/socket");

// Fetch AI-generated response based on previous chats
exports.airesponse = async (req, res) => {
    try {
        const { userMessage } = req.body;

        const response = await db("chat")
            .where("user_message", "ILIKE", `%${userMessage}%`)
            .select("bot_response")
            .whereNotNull("bot_response")
            .first();

        if (response) {
            return res.json({ answer: response.bot_response });
        }

        await db("chat").insert({
            user_message: userMessage,
            bot_response: null,
            admin_assigned: false,
        });

        res.json({ answer: "I'm not sure, but an admin will assist you soon." });
    } catch (error) {
        console.error("Error processing AI response:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// User sends a message
exports.sendMessage = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await db("chat")
            .where("user_message", "ILIKE", `%${message}%`)
            .select("bot_response")
            .first();

        let botResponse = "Your message has been received. An admin will reply soon.";
        if (response && response.bot_response) {
            botResponse = response.bot_response;
        } else {
            await db("chat").insert({
                user_message: message,
                bot_response: null,
                admin_assigned: false,
            });
        }

        io.emit("receiveMessage", { userMessage: message, botResponse });

        return res.json({ response: botResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

// Admin replies to a user
exports.adminReply = async (req, res) => {
    const { query_id, reply } = req.body;

    try {
        await db("chat")
            .where("id", query_id)
            .update({
                bot_response: reply,
                admin_assigned: true,
            });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

// Fetch unanswered queries
exports.getUnansweredQueries = async (req, res) => {
    try {
        const queries = await db("chat").where("admin_assigned", false).select();
        res.json(queries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};

// Fetch all chat messages
exports.getAllMessages = async (req, res) => {
    try {
        const messages = await db("chat").select();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
};