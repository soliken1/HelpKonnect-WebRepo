"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Analytics from "@/components/dashboard/Analytics";
import SideAnalytics from "@/components/dashboard/SideAnalytics";
import { useState, useEffect } from "react";
function Dashboard() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole("facility");
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar role={role} />
      <Analytics />
      <SideAnalytics />
    </div>
  );
}

export default Dashboard;
