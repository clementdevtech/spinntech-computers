const Chat = require("../models/Chat");
const db = require("../db");


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


// ✅ Store User Query
exports.storeUserQuery = async (req, res) => {
  try {
    const { user_id, message } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Query cannot be empty" });
    }

    const newQuery = await db("chat_queries").insert({ user_id, message }).returning("*");
    res.status(201).json(newQuery);
  } catch (error) {
    res.status(500).json({ message: "Error storing query", error });
  }
};

// ✅ Fetch Similar Queries & Suggested Replies
exports.getSuggestedReplies = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    // Find similar queries from history
    const similarQueries = await db("chat_queries")
      .where("message", "ILIKE", `%${query}%`)
      .select("message", "admin_reply")
      .limit(5);

    res.json(similarQueries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching replies", error });
  }
};

// ✅ Admin Responds to User Query
exports.adminReply = async (req, res) => {
  try {
    const { query_id, reply } = req.body;
    if (!query_id || !reply) {
      return res.status(400).json({ message: "Query ID and reply are required" });
    }

    const updatedQuery = await db("chat_queries")
      .where({ id: query_id })
      .update({ admin_reply: reply })
      .returning("*");

    res.json(updatedQuery);
  } catch (error) {
    res.status(500).json({ message: "Error saving admin response", error });
  }
};
