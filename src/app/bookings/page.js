"use client";
import React from "react";
import Body from "@/components/bookings/Body";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { getCookie } from "cookies-next";
import Ribbon from "@/components/dashboard/Ribbon";

function Bookings() {
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");
  useEffect(() => {
    setRole(getCookie("role"));
    setUser(getCookie("user"));
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar role={role} />
      <Ribbon />
      <Body user={user} />
    </div>
  );
}

export default Bookings;
