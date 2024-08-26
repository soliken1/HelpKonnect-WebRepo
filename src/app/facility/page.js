"use client";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";
import Profile from "@/components/dashboard/Profile";
import Body from "@/components/facility/Body";

function Facility() {
  const [role, setRole] = useState("");

  useEffect(() => {
    Object.freeze(setRole(getCookie("role")));
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar role={role} />
      <Profile />
      <Body />
    </div>
  );
}

export default Facility;
