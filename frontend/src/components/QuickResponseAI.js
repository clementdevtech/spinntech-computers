import axios from "axios";

export const getAIResponse = async (userMessage) => {
  try {
    const response = await axios.post("/api/chat/ai-response", { userMessage });
    return response.data.answer || "I'm not sure, but an admin will assist you soon.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Sorry, there was an issue retrieving a response.";
  }
};
