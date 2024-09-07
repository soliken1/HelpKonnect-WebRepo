"use client";
import React from "react";
import Table from "@/components/bookings/Table";
import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { getCookie } from "cookies-next";
import Ribbon from "@/components/dashboard/Ribbon";

function Bookings() {
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

export default Bookings;
