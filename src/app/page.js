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
import { toast, Bounce } from "react-toastify";
import { ToastContainer } from "react-toastify";
const Startup = dynamic(() => import("@/components/home/Startup"), {
  ssr: false,
});

export default function Home() {
  const [isStarting, setIsStarting] = useState(true);
  const [slideEffect, setSlideEffect] = useState("translate-x-full opacity-0");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          toast.error("Your account has been banned. Please contact support.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          setIsLoading(false);
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
        console.error("No such document!");
      }
    } catch (error) {
      toast.error("User Email or Password Is Incorrect, Please Try Again", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setLoggingIn(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden relative">
      <div className="w-1/2 hidden md:block h-screen justify-center items-center">
        <a
          className="absolute bottom-4 left-4 hover:scale-110 duration-300 opacity-50 hover:opacity-100 animate-bounce hover:animate-none group"
          href="https://github.com/ajiwnl/HelpKonnect-Android"
          target="_blank"
        >
          <Image
            src="/Images/MobileFrame.png"
            width={1920}
            height={1080}
            className="h-[240px] w-[120px]"
            alt="Phone Frame"
          />

          <span className="absolute left-full top-1/2 transform w-[400px] -translate-y-1/2 ml-4 p-4 text-lg font-semibold text-white rounded-lg shadow-lg bg-gradient-to-br to-red-300 from-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Check Out Our Mobile Application For Users and Mental Health
            Professionals!
          </span>
        </a>

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
        <div className="w-full h-2/6 relative flex justify-center">
          <Image
            alt="Image"
            src="/Logo/Logo.png"
            className="absolute bottom-0 transform"
            width={175}
            height={175}
          />
        </div>
        <form
          className="w-full h-4/6 ps-16 pe-16 flex flex-col gap-3 relative"
          onSubmit={(e) => handleLogin(e, email, password)}
        >
          <label className="text-white text-3xl font-bold text-center">
            Sign In
          </label>
          <label className="text-white font-normal text-center">
            Management For Partnered Facilities and Developer Moderations
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
          <div className="w-full flex justify-between h-6 px-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="text-sm text-white">Remember Me?</span>
            </label>
            <label className="text-sm text-white cursor-pointer underline">
              Forgot Password?
            </label>
          </div>
          <div className="w-full flex justify-center items-center flex-col">
            <button
              type="submit"
              className="w-1/2 hover:bg-red-600 duration-300 flex items-center justify-center h-10 bg-red-500 rounded-lg text-white font-bold"
            >
              Login
            </button>
            <label className="absolute bottom-8 text-xs max-w-72 text-center text-white">
              By signing in, I have read, understand, and agree to the
              Help-Konnect's{" "}
              <a
                className="underline"
                href="https://www.google.com"
                target="_blank"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                className="underline"
                href="https://www.google.com"
                target="_blank"
              >
                Privacy Policy.
              </a>
            </label>
          </div>
        </form>
      </div>
      {loggingIn && <LoginLoading />}
      <ToastContainer />
    </div>
  );
}
