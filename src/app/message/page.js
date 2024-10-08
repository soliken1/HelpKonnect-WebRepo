"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Sidebar from "@/components/dashboard/Sidebar";
import UserList from "@/components/messages/UserList";
import { db } from "@/configs/firebaseConfigs";
import { collection, getDocs } from "firebase/firestore";
import UserListLoading from "@/components/loaders/Message/UserListLoading";

function Message() {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRole(getCookie("role"));
    setUserId(getCookie("userId"));
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex flex-row h-screen w-screen overflow-x-hidden">
      <Sidebar role={role} />
      {isLoading === true ? (
        <UserListLoading />
      ) : (
        <UserList users={users} currentUser={userId} />
      )}
    </div>
  );
}

export default Message;
