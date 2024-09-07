"use client";
import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Table from "@/components/professionals/Table";
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
      <Table />
    </div>
  );
}

export default Professionals;
