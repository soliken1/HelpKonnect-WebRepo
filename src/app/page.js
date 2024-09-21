"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { db } from "@/configs/firebaseConfigs";
import dynamic from "next/dynamic";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { auth } from "@/configs/firebaseConfigs";
import { setCookie } from "cookies-next";
import { logUserActivity } from "@/utils/userActivity";
import { logSessionStart } from "@/utils/sessions";
import LoginLoading from "@/components/loaders/Login/LoginLoading";
const Startup = dynamic(() => import("@/components/home/Startup"), {
  ssr: false,
});

export default function Home() {
  const [isStarting, setIsStarting] = useState(true);
  const [slideEffect, setSlideEffect] = useState("translate-x-full opacity-0");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
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

  const setServerCookie = async (user) => {
    await fetch("/api/generateCookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.userId, email: user.email }),
    });
  };

  const handleLogin = async (event, email, password) => {
    event.preventDefault();
    setError("");
    setLoggingIn(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "credentials", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();

        if (userData.banned) {
          alert("Your account has been banned. Please contact support.");
          return;
        }

        setCookie("role", userData.role);
        setCookie("user", userData.facilityName);
        setCookie("userId", userData.userId);
        setCookie("userProfile", userData.imageUrl);
        setCookie("userDescription", userData.facilityDescription);
        setCookie("userLocation", userData.facilityLocation);
        setCookie("userEmail", userData.email);

        await logUserActivity(userData.userId);
        await logSessionStart(userData.userId);

        await setServerCookie(userData);

        router.push("/dashboard");
        setLoggingIn(false);
      } else {
        setIsLoading(false);
        console.log("No such document!");
      }
    } catch (error) {
      setError("User Email or Password Is Incorrect, Please Try Again");
      setLoggingIn(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden relative">
      <div className="w-1/2 hidden md:block h-screen justify-center items-center">
        <Image
          className="object-cover w-full h-full"
          width={1920}
          height={1080}
          src="/Images/Background.png"
          alt="Image"
          priority={true}
        />
      </div>
      <div
        className={`w-full md:w-1/2 h-screen transform transition-transform translate-x- duration-1000 ease-in-out rounded-s-2xl ${slideEffect} shadow-xl shadow-red-300 bg-red-300`}
      >
        <div className="w-full h-2/6 flex justify-center items-center">
          <Image
            alt="Image"
            src="/Logo/LogoCircular.png"
            width={175}
            height={175}
          />
        </div>
        <form
          className="w-full h-4/6 ps-16 pe-16 flex flex-col gap-3"
          onSubmit={(e) => handleLogin(e, email, password)}
        >
          <label className="text-white text-2xl font-bold text-center">
            Logging In As Admin
          </label>
          <label className="text-white font-normal text-center">
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
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
              placeholder=" "
              autoComplete="off"
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-red-300 dark:text-red-300 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-transparent px-2 peer-focus:px-2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Email
            </label>
          </div>
          <div className="relative mt-5">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-black rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-red-300 focus:outline-none focus:ring-0 focus:border-red-300 peer"
              placeholder=" "
              autoComplete="new-password"
            />
            <label
              htmlFor="password"
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
          {error && <p className="text-white font-bold text-center">{error}</p>}
        </form>
      </div>
      {loggingIn && <LoginLoading />}
    </div>
  );
}
