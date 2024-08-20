"use client";
import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/professionals/Table";
import Profile from "@/components/dashboard/Profile";
import { getCookie } from "cookies-next";

function Professionals() {
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

export default Professionals;
