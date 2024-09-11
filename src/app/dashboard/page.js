"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Analytics from "@/components/dashboard/Analytics";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Ribbon from "@/components/dashboard/Ribbon";
function Dashboard() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row overflow-hidden">
      <Sidebar role={role} />
      <Analytics />
      <Ribbon />
    </div>
  );
}

export default Dashboard;
