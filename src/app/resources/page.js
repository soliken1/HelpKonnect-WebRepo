"use client";
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Profile from "@/components/dashboard/Profile";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";

function Resources() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar role={role} />
      <Profile />
    </div>
  );
}

export default Resources;
