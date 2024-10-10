"use client";
import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Body from "@/components/resources/Body";
import Ribbon from "@/components/dashboard/Ribbon";

function Resources() {
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

export default Resources;
