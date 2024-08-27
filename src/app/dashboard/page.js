"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Analytics from "@/components/dashboard/Analytics";
import SideAnalytics from "@/components/dashboard/SideAnalytics";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Profile from "@/components/dashboard/Profile";

function Dashboard() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row overflow-hidden">
      <Sidebar role={role} />
      <Analytics />
      <Profile />
      <SideAnalytics />
    </div>
  );
}

export default Dashboard;
