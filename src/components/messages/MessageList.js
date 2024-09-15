"use client";
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/configs/firebaseConfigs";

function MessageList({ messages, selectedUser, currentUser }) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    try {
      await addDoc(collection(db, "message"), {
        message: newMessage,
        receiver: selectedUser.userId,
        sender: currentUser,
        time: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white rounded-lg shadow-md">
      <div className="w-full h-16 shadow-sm px-8 flex items-center">
        <label className="mt-2 font-semibold">
          {selectedUser?.facilityName || selectedUser?.username}
        </label>
      </div>
      <div className="w-full h-5/6 flex flex-col px-8 py-4 md:py-0 overflow-auto gap-3 mt-4">
        {messages.length === 0 ? (
          <p>No messages</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex w-full flex-col gap-2 ${
                message.sender === currentUser ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`${
                  message.sender === currentUser
                    ? "bg-red-300 text-white"
                    : "bg-gray-300"
                } px-4 py-2 rounded-xl`}
              >
                <p>{message.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <form
        className="bottom-4 left-4 flex flex-row w-full justify-center items-center gap-2 md:gap-6 h-20 px-6 py-4 md:p-0"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Send Message Here..."
          className="w-5/6 h-8 rounded-full px-6 text-xs bg-slate-200 shadow-sm"
        />
        <button
          type="submit"
          className="bg-slate-200 px-4 py-2 rounded-full shadow-sm"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.6665 1.66663L10.6665 12.6666"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.6665 1.66663L14.6665 21.6666L10.6665 12.6666L1.6665 8.66663L21.6665 1.66663Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default MessageList;
