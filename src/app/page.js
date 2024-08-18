"use client";
import { useState, useEffect } from "react";
const Startup = dynamic(() => import("@/components/home/Startup"), {
  ssr: false,
});

import dynamic from "next/dynamic";

export default function Home() {
  const [isStarting, setIsStarting] = useState(true);
  const [slideEffect, setSlideEffect] = useState("translate-x-full opacity-0");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarting(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isStarting) {
    return <Startup />;
  } else {
    setTimeout(() => {
      setSlideEffect("translate-x-62");
    }, 200);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/2 h-screen flex justify-center items-center">
        <label className="text-red-300">Image</label>
      </div>
      <div
        className={`w-1/2 h-screen p-16 flex justify-center transform transition-transform duration-1000 ease-in-out ${slideEffect} bg-red-300`}
      >
        <label className="text-white text-2xl font-bold">Login Form</label>
      </div>
    </div>
  );
}
