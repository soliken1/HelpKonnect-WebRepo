"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Sidebar from "@/components/dashboard/Sidebar";
import Ribbon from "@/components/dashboard/Ribbon";
import Body from "@/components/moderation/Body";

function Moderation() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row overflow-hidden">
      <Sidebar role={role} />
      <Body />
      <Ribbon />
    </div>
  );
}

export default Moderation;
