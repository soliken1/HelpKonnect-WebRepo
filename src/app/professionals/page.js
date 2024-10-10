"use client";
import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Body from "@/components/professionals/Body";
import { getCookie } from "cookies-next";
import Ribbon from "@/components/dashboard/Ribbon";

function Professionals() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar role={role} />
      <Ribbon />
      <Body />
    </div>
  );
}

export default Professionals;
