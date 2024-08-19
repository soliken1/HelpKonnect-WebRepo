"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState, useEffect } from "react";
function Dashboard() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole("facility");
  }, []);
  return (
    <div>
      <Sidebar role={role} />
    </div>
  );
}

export default Dashboard;
