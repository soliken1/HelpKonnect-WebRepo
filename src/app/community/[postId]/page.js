"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import Sidebar from "@/components/dashboard/Sidebar";
import Ribbon from "@/components/dashboard/Ribbon";
import SelectedPost from "@/components/community/SelectedPost";

function PostID() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(getCookie("role"));
  }, []);
  return (
    <div className="flex flex-row h-screen w-screen overflow-x-hidden bg-gray-100">
      <Sidebar role={role} />
      <SelectedPost />
      <Ribbon />
    </div>
  );
}

export default PostID;
