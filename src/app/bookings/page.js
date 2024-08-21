"use client";
import React from "react";
import Table from "@/components/bookings/Table";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Profile from "@/components/dashboard/Profile";
import { getCookie } from "cookies-next";

function Bookings() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar role={role} />
      <Profile />
      <Table />
    </div>
  );
}

export default Bookings;
