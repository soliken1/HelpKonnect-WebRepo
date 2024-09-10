"use client";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { getDailyActiveUsers } from "@/utils/dau.js";
import LineChart from "./LineChart";

function Analytics() {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setUser(getCookie("user"));
    setRole(getCookie("role"));

    async function fetchChartData() {
      try {
        const data = await getDailyActiveUsers();
        console.log("Fetched data:", data); // Add this line to check data

        if (!Array.isArray(data)) {
          throw new Error("Data is not an array");
        }

        const userCounts = data.reduce((acc, item) => {
          const date = new Date(
            item.lastActive.seconds * 1000
          ).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(userCounts);
        const values = Object.values(userCounts);

        setChartData({
          labels,
          datasets: [
            {
              label: "Daily Active Users",
              data: values,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }

    fetchChartData();
  }, []);

  return (
    <div className="flex flex-col w-3/4 h-screen p-10">
      <label className="text-lg font-bold">Analytics</label>
      <label className="font-medium text-gray-400">
        General Statistics on {role === "admin" ? "Application" : user}
      </label>
      <div className="h-5/6 flex justify-center items-center">
        {chartData ? <LineChart data={chartData} /> : <p>Loading...</p>}
      </div>
    </div>
  );
}

export default Analytics;
