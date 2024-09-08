import React, { useEffect } from "react";
import { handleIncomingMessages } from "@/utils/firebaseConfigs.js";
import sendNotification from "@/utils/sendNotification";

function MessageList({ messages }) {
  useEffect(() => {
    handleIncomingMessages();
  }, []);

  const handleSendMessage = () => {
    sendNotification(
      "GrHxzpnJxcVZIhOUPWkNitsZM4B3",
      "Hello",
      "This is a test message"
    );
  };

  return (
    <div className="flex-1 p-4 bg-white rounded-lg shadow-md">
      <label className="text-black font-bold text-xl">Messages</label>
      <button onClick={handleSendMessage}>Send Message</button>
      <div className="w-full h-full flex flex-col gap-3 mt-4">
        {messages.length === 0 ? (
          <p>No messages</p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="bg-gray-100 p-2 rounded-lg">
                <p>{message.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MessageList;
