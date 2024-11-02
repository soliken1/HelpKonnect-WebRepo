"use client";
import LoadMessages from "@/components/messages/LoadMessages";
import React, { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import { getCookie } from "cookies-next";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import Sidebar from "@/components/dashboard/Sidebar";
import { db } from "@/configs/firebaseConfigs";

const API_KEY = process.env.STREAM_API_KEY;

function Page() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [role, setRole] = useState("");
  const { selectedUserId } = useParams();

  useEffect(() => {
    const userId = getCookie("userId");
    const userRole = getCookie("role");
    setCurrentUser(userId);
    setRole(userRole);
  }, [currentUser]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const docRef = doc(db, "credentials", selectedUserId);
        const userSnapshot = await getDoc(docRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setSelectedUser({ id: userSnapshot.id, ...userData });
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (selectedUserId) {
      fetchUser();
    }
  }, [selectedUserId]);

  useEffect(() => {
    const initChat = async () => {
      try {
        if (!currentUser || !selectedUser || !selectedUser.userId) {
          console.error("currentUser or selectedUser is null");
          return;
        }

        let client = chatClient;
        if (!client) {
          client = StreamChat.getInstance(API_KEY);

          const response = await fetch("/api/generateToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: currentUser }),
          });
          const data = await response.json();
          const userToken = data.token;

          await client.connectUser(
            {
              id: currentUser,
              name: selectedUser.facilityName || selectedUser.username,
            },
            userToken
          );

          setChatClient(client);
        }
        const userIds = [currentUser, selectedUser.userId].sort();

        const customChannelId = `${userIds[0]}_${userIds[1]}`;
        const conversation = client.channel("messaging", customChannelId, {
          members: [currentUser, selectedUser.userId],
        });

        await conversation.watch();
        setChannel(conversation);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    if (selectedUser) {
      initChat();
    }

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [currentUser, selectedUser, chatClient]);

  return (
    <div className="flex flex-row h-screen w-screen overflow-x-hidden">
      <Sidebar role={role} />
      <LoadMessages
        chatClient={chatClient}
        channel={channel}
        selectedUser={selectedUser}
        currentUser={currentUser}
      />
    </div>
  );
}

export default Page;
