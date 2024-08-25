"use client";
import { getCookie } from "cookies-next";
import React from "react";
import { useEffect, useState } from "react";

function Analytics() {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(getCookie("user"));
  }, []);

  return (
    <div className="flex flex-col w-3/4 h-screen p-10">
      <label className="text-lg font-bold">Analytics</label>
      <label className="font-medium text-gray-400">
        General Statistics on {user}
      </label>
      <div className="h-5/6 flex justify-center items-center">
        <label className="font-bold text-3xl">
          Big Analytics Stuffs Here From Google Firebase Analytics
        </label>
      </div>
    </div>
  );
}

export default Analytics;
