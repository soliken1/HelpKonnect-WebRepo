"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { ring2 } from "ldrs";

function Startup() {
  ring2.register();

  useEffect(() => {
    const timer = setTimeout(() => {}, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <img className="w-52 h-52 rounded-full" src="/Logo/Logo.png" alt="Logo" />
      <label className="text-black text-3xl md:text-6xl font-bold mb-5">
        Help-
        <label className="text-red-300 text-3xl md:text-6xl font-bold ">
          Konnect
        </label>
      </label>
      <label className="text-black text-xl md:text-4xl mb-8 text-center">
        Your Mental Health Care Provider and Assistant
      </label>
      <l-ring-2
        size="40"
        stroke="5"
        stroke-length="0.25"
        bg-opacity="0.1"
        speed="0.8"
        color="pink"
      ></l-ring-2>{" "}
      <label className="absolute bottom-10 text-red-300 text-lg">
        The Help-Konnect Team 2024
      </label>
    </div>
  );
}

export default Startup;
