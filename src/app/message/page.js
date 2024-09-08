"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Sidebar from "@/components/dashboard/Sidebar";
import Ribbon from "@/components/dashboard/Ribbon";
import Body from "@/components/messages/Body";

function Message() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row overflow-hidden">
      <Sidebar role={role} />
      <Ribbon />
      <Body />
    </div>
  );
}

export default Message;
