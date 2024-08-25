"use client";
import { useState, useEffect } from "react";
const Startup = dynamic(() => import("@/components/home/Startup"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
export default function Home() {
  const [isStarting, setIsStarting] = useState(true);
  const [slideEffect, setSlideEffect] = useState("translate-x-full opacity-0");
  const router = useRouter();

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
      setSlideEffect("translate-x-0");
    }, 200);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setCookie("role", "facility");
      setCookie("user", "Sample Facility 1");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/2 h-screen flex justify-center items-center">
        <Image
          width={1200}
          height={1200}
          objectFit="cover"
          src="/Background.png"
        />
      </div>
      <div
        className={`w-1/2 h-screen transform transition-transform translate-x- duration-1000 ease-in-out rounded-s-2xl ${slideEffect} shadow-xl shadow-red-300 bg-red-300`}
      >
        <div className="w-full h-2/6 flex justify-center items-center">
          <Image src="/Logo/LogoCircular.png" width={175} height={175} />
        </div>
        <form
          className="w-full h-4/6 ps-16 pe-16 flex flex-col gap-3"
          onSubmit={handleLogin}
        >
          <label className="text-white text-2xl font-bold">
            Logging In As Admin
          </label>
          <label className="text-white font-normal">
            Not an Admin? Check Out Our{" "}
            <a
              target="_blank"
              href="https://www.google.com"
              className="text-white font-bold"
            >
              Mobile Application!
            </a>
          </label>
          <div className="relative mt-5">
            <input
              type="email"
              name="email"
              id="floating_outlined"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
              placeholder=" "
              autoComplete="off"
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email
            </label>
          </div>
          <div className="relative mt-5">
            <input
              type="password"
              id="floating_outlined"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
              placeholder=" "
              autoComplete="new-password"
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Password
            </label>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="w-1/2 flex items-center justify-center h-10 mt-3 bg-red-500 rounded-lg text-white font-bold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
