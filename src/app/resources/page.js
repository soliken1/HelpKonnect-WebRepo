"use client";
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Profile from "@/components/dashboard/Profile";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Body from "@/components/resources/Body";

function Resources() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar role={role} />
      <Profile />
      <Body />
    </div>
  );
}

export default Resources;
