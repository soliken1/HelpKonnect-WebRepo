"use client";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
const Sidebar = dynamic(() => import("@/components/dashboard/Sidebar.js"));
const Profile = dynamic(() => import("@/components/dashboard/Profile.js"));
const Body = dynamic(() => import("@/components/facility/Body.js"));

function Facility() {
  const [role, setRole] = useState("");

  useEffect(() => {
    Object.freeze(setRole(getCookie("role")));
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar role={role} />
      <Profile />
      <Body />
    </div>
  );
}

export default Facility;
