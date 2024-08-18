"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { pinwheel } from "ldrs";

function Startup() {
  pinwheel.register();

  useEffect(() => {
    const timer = setTimeout(() => {}, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Image
        className="absolute top-16"
        src="/Logo.png"
        width={300}
        height={300}
        alt="Logo"
      />
      <label className="text-black text-6xl font-bold mb-5">
        Help-<label className="text-red-300 text-6xl font-bold ">Konnect</label>
      </label>
      <label className="text-black text-4xl mb-8">
        Your Mental Health Care Provider and Assistant
      </label>
      <l-pinwheel size="40" stroke="3.5" speed="0.9" color="pink"></l-pinwheel>
      <label className="absolute bottom-10 text-red-300 text-xl">
        The Help-Konnect Team 2024
      </label>
    </div>
  );
}

export default Startup;
