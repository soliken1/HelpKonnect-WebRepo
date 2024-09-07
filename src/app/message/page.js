"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Sidebar from "@/components/dashboard/Sidebar";
import Analytics from "@/components/dashboard/Analytics";
import Ribbon from "@/components/dashboard/Ribbon";

function Message() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row overflow-hidden">
      <Sidebar role={role} />
      <Ribbon />
    </div>
  );
}

export default Message;
