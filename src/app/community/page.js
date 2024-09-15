"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Sidebar from "@/components/dashboard/Sidebar";
import Ribbon from "@/components/dashboard/Ribbon";
import Body from "@/components/community/Body";

function Community() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row h-screen w-screen overflow-x-hidden">
      <Sidebar role={role} />
      <Body />
      <Ribbon />
    </div>
  );
}

export default Community;
