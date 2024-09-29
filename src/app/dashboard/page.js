"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Analytics from "@/components/dashboard/Analytics";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Ribbon from "@/components/dashboard/Ribbon";
import { useRouter } from "next/navigation";
function Dashboard() {
  const [role, setRole] = useState();
  const router = useRouter();

  useEffect(() => {
    const roleCookie = getCookie("role");
    const currentUserCookie = getCookie("currentUser");

    setRole(roleCookie);

    if (!roleCookie && !currentUserCookie) {
      try {
        const clearCookie = async () => {
          await fetch("/api/clearCookie", { method: "POST" });

          const cookies = document.cookie.split(";");
          cookies.forEach((cookie) => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
          });

          router.push("/");
        };
        clearCookie();
      } catch (err) {
        console.error(err);
      }
    }
  }, [role, router]);

  return (
    <div className="flex flex-row overflow-hidden">
      <Sidebar role={role} />
      <Analytics />
      <Ribbon />
    </div>
  );
}

export default Dashboard;
