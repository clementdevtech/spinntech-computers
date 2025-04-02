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
        // Step 1: Check for a recent matching response
        const response = await db("chat")
            .where("user_message", "ILIKE", `%${message}%`)
            .select("bot_response")
            .whereNotNull("bot_response")
            .orderBy("created_at", "desc") // Get the latest response
            .first();

        // Step 2: If a match is found, return the previous response
        if (response) {
            io.emit("receiveMessage", { userMessage: message, botResponse: response.bot_response });
            return res.json({ response: response.bot_response });
        }

        // Step 3: If no match found, insert the message into the database
        const [queryId] = await db("chat")
            .insert({
                user_message: message,
                bot_response: null,
                admin_assigned: false, // No admin assigned yet
                created_at: new Date()
            })
            .returning("id"); // Get the inserted query ID

        // Step 4: Notify admins that a new query needs attention
        io.emit("newUnansweredQuery", { queryId, message });

        // Step 5: Send a placeholder response
        return res.json({ response: "I'm not sure, but an admin will assist you soon." });
    } catch (error) {
        console.error("Error processing message:", error);
        return res.status(500).json({ error: "Database error" });
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