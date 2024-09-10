"use client";
import React, { useState, useEffect } from "react";
import List from "./List";
import MessageList from "./MessageList";
import { db } from "@/configs/firebaseConfigs";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

function Body({ currentUser }) {
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
    let unsubscribe;

    if (selectedUser && currentUser) {
      console.log("Setting up real-time listener for messages");

      const q = query(
        collection(db, "message"),
        where("receiver", "in", [selectedUser.userId, currentUser]),
        where("sender", "in", [selectedUser.userId, currentUser]),
        orderBy("time", "asc")
      );

      unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const messagesData = querySnapshot.docs.map((doc) => doc.data());
          setMessages(messagesData);
          console.log("Real-time messages data:", messagesData);
        },
        (error) => {
          console.error("Error listening to real-time messages:", error);
        }
      );
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [selectedUser, currentUser]);

  return (
    <div className="w-full flex md:flex-row flex-col gap-5 p-10">
      <List
        users={users}
        currentUser={currentUser}
        onSelectUser={setSelectedUser}
      />
      <MessageList
        messages={messages}
        selectedUser={selectedUser}
        currentUser={currentUser}
      />
    </div>
  );
}

export default Body;
