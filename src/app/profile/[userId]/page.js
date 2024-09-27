"use client";
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import UserBody from "@/components/profile/UserBody";

function Profile() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row h-screen w-screen overflow-x-hidden bg-gray-100">
      <Sidebar role={role} />
      <UserBody />
    </div>
  );
}

export default Profile;
