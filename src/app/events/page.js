"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Ribbon from "@/components/dashboard/Ribbon";
import Sidebar from "@/components/dashboard/Sidebar";
import Body from "@/components/events/Body";

function Events() {
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

export default Events;
