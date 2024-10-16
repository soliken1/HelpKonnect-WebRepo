import React, { useState } from "react";
import {
  Chat,
  Channel,
  MessageInput,
  MessageList,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { useRouter } from "next/navigation";
import MessageLoading from "@/components/loaders/Message/MessageLoading";
import VideoCall from "./VideoCall";
import Image from "next/image";

function LoadMessages({ chatClient, channel, selectedUser, currentUser }) {
  const router = useRouter();
  const [isCallClicked, setIsCallClicked] = useState(false);
  const [callId, setCallId] = useState("");

  const backMessage = () => {
    router.push("/message");
  };

  if (!chatClient || !channel) {
    return (
      <div className="w-full h-full pb-8">
        <MessageLoading />
      </div>
    );
  }

  const startVideoCall = () => {
    const newCallId = `${currentUser}${selectedUser.userId}`;
    setCallId(newCallId);
    setIsCallClicked(true);
    channel.sendMessage({
      text: `You have an incoming video call. Join This Link: https://getstream.io/video/demos/join/${callId}?id=${callId}`,
      user: { id: currentUser },
    });
  };

  return (
    <div className="w-full h-full pb-8">
      {isCallClicked ? (
        <VideoCall
          selectedUser={selectedUser}
          currentUser={currentUser}
          onEndCall={() => setIsCallClicked(false)}
        />
      ) : (
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <Window>
              <div className="flex flex-row gap-5 items-center px-8 py-4 border-b-2">
                <div
                  className="flex justify-center items-center"
                  onClick={backMessage}
                  type="button"
                >
                  <Image
                    className="cursor-pointer w-6 h-6"
                    width={1920}
                    height={1080}
                    src="/BackIcon.svg"
                    alt="Back Icon"
                  />
                </div>
                <Image
                  className="w-16 h-16 rounded-full shadow-md"
                  src={selectedUser?.imageUrl}
                  alt={selectedUser?.facilityName || selectedUser?.username}
                  width={1920}
                  height={1080}
                />
                <h2>{selectedUser?.facilityName || selectedUser?.username}</h2>
                <button
                  className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={startVideoCall}
                >
                  Start A Call
                </button>
              </div>
              <MessageList />
              <div className="px-6">
                <MessageInput />
              </div>
            </Window>
          </Channel>
        </Chat>
      )}
    </div>
  );
}

export default LoadMessages;
