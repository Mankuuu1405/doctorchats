import React from "react";
import { Widget, addResponseMessage } from "react-chat-widget";

// 1. Import the library's CSS first
import "react-chat-widget/lib/styles.css";

// 2. Import your custom CSS file second
import "./ChatBot.css";

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
        showCloseButton={true} // It's generally good practice to allow users to close the chat
      />
    </div>
  );
};

export default ChatBot;