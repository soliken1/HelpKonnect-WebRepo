"use client";
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Body from "@/components/profile/Body";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";

function Profile() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row bg-gray-100">
      <Sidebar role={role} />
      <Body />
    </div>
  );
}

export default Profile;
