import React, { useState, useEffect } from "react";
import List from "./List";
import MessageList from "./MessageList";
import { db } from "@/configs/firebaseConfigs";
import { collection, getDocs } from "firebase/firestore";

function Body() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "credentials"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const querySnapshot = await getDocs(
            collection(db, `messages/${selectedUser.id}/userMessages`)
          );
          const messagesData = querySnapshot.docs.map((doc) => doc.data());
          setMessages(messagesData);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }
  }, [selectedUser]);

  return (
    <div className="w-full flex flex-row gap-5 p-10">
      <List users={users} onSelectUser={setSelectedUser} />
      <MessageList messages={messages} />
    </div>
  );
}

export default Body;
