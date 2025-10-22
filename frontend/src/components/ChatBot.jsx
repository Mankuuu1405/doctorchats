import React from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import axios from "axios";

const ChatBot = () => {
  React.useEffect(() => {
    addResponseMessage("👋 Hi! I'm your AI Assistant. How can I help you today?");
  }, []);

  const handleNewUserMessage = async (message) => {
    try {
      const res = await axios.post("http://localhost:4000/api/chat", {
        message,
      });
      addResponseMessage(res.data.reply);
    } catch (error) {
      console.error("Chat Error:", error);
      addResponseMessage("⚠️ Sorry, something went wrong. Please try again later.");
    }
  };

  return (
    <div className="App">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="💬 Cywala Chatbot"
        subtitle="Powered by OpenRouter"
        senderPlaceHolder="Type your question..."
        showCloseButton={true}
      />
    </div>
  );
};

export default ChatBot;
