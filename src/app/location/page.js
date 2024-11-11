"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/components/dashboard/Sidebar.js"), {
  ssr: false,
});
const Ribbon = dynamic(() => import("@/components/dashboard/Ribbon.js"), {
  ssr: false,
});
const Body = dynamic(() => import("@/components/location/Body.js"), {
  ssr: false,
});
import { getCookie } from "cookies-next";

function Location() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row">
      <Sidebar role={role} />
      <Ribbon />
      <Body />
    </div>
  );
}

export default Location;
