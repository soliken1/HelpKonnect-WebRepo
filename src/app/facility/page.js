"use client";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/components/dashboard/Sidebar.js"));
const Ribbon = dynamic(() => import("@/components/dashboard/Ribbon.js"));
const Body = dynamic(() => import("@/components/facility/Body.js"));

function Facility() {
  const [role, setRole] = useState("");

  useEffect(() => {
    Object.freeze(setRole(getCookie("role")));
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar role={role} />
      <Ribbon />
      <Body />
    </div>
  );
}

export default Facility;
