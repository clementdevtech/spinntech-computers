import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../redux/chatSlice";
import axios from "axios";

const QuickResponses = () => {
  const dispatch = useDispatch();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchQuickResponses = async () => {
      try {
        const res = await axios.get("/api/chat/quick-responses");
        setResponses(res.data);
      } catch (error) {
        console.error("Error fetching quick responses:", error);
      }
    };

    fetchQuickResponses();
  }, []);

  return (
    <div className="quick-responses">
      <h3>Quick Questions:</h3>
      {responses.map((response, index) => (
        <button key={index} onClick={() => dispatch(sendMessage(response.question))}>
          {response.question}
        </button>
      ))}
    </div>
  );
};

export default QuickResponses;