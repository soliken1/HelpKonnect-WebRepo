"use client";
import React from "react";
import {
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { useRouter } from "next/navigation";

function LoadMessages({ chatClient, channel, selectedUser }) {
  const router = useRouter();

  const backMessage = () => {
    router.push("/message");
  };

  if (!chatClient || !channel) {
    return <div className="w-full h-full pb-8">Loading Please Wait!</div>;
  }

  return (
    <div className="w-full h-full pb-8">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <div className="flex flex-row gap-5 items-center px-8 py-4 border-b-2">
              <div
                className="flex justify-center items-center"
                onClick={backMessage}
                type="button"
              >
                <img className="cursor-pointer" src="/Message.svg" />
              </div>
              <img
                className="w-16 h-16 rounded-full shadow-md"
                src={selectedUser?.imageUrl}
              />
              <h2>{selectedUser?.facilityName || "Chat"}</h2>
            </div>
            <MessageList />
            <div className="px-6">
              <MessageInput />
            </div>
          </Window>
        </Channel>
      </Chat>
    </div>
  );
}

export default LoadMessages;
