"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Sidebar from "@/components/dashboard/Sidebar";
import Ribbon from "@/components/dashboard/Ribbon";
import Body from "@/components/messages/Body";

function Message() {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setRole(getCookie("role"));
    setUserId(getCookie("userId"));
  }, []);
  return (
    <div className="flex flex-row h-screen w-screen overflow-x-hidden">
      <Sidebar role={role} />
      <Ribbon />
      <Body currentUser={userId} />
    </div>
  );
}

export default Message;
