"use client";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { getWeeklyData } from "@/utils/weeklyData.js";
import LineChart from "./LineChart";
import { getTotalUser, getPrevTotalUser } from "@/utils/totaluser";
import { getDau, getPrevActivity } from "@/utils/dau";
import {
  getTodayAvgSessionDuration,
  getPrevDayAvgSessionDuration,
} from "@/utils/avgSession";
import formatDuration from "@/utils/formatDuration";
import ChartLoader from "../loaders/Analytics/ChartLoader";

function Analytics() {
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");
  const [chartData, setChartData] = useState(null);
  const [totalUser, setTotalUser] = useState("");
  const [dau, setDau] = useState("");
  const [prevDayActivity, setPrevDayActivity] = useState("");
  const [prevTotalUser, setPrevTotalUser] = useState("");
  const [avgSession, setAvgSession] = useState(0);
  const [prevAvgSession, setPrevAvgSession] = useState(0);

  useEffect(() => {
    setUser(getCookie("user"));
    setRole(getCookie("role"));

    async function fetchAvgSession() {
      try {
        const data = await getTodayAvgSessionDuration();
        const prevData = await getPrevDayAvgSessionDuration();
        setPrevAvgSession(prevData);
        setAvgSession(data);
      } catch (error) {
        console.error("Error fetching average session duration:", error);
      }
    }

    async function fetchDau() {
      try {
        const data = await getDau();
        const prevData = await getPrevActivity();

        setPrevDayActivity(prevData);
        setDau(data);
      } catch (error) {
        console.error("Error fetching Dau:", error);
      }
    }

    async function fetchTotalUser() {
      try {
        const data = await getTotalUser();
        const prevData = await getPrevTotalUser();
        setPrevTotalUser(prevData);
        setTotalUser(data);
      } catch (error) {
        console.error("Error fetching total user:", error);
      }
    }

    async function fetchChartData() {
      try {
        const data = await getWeeklyData();

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
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 1,
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    }
    fetchAvgSession();
    fetchDau();
    fetchTotalUser();
    fetchChartData();
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen p-10">
      <label className="text-lg font-bold">Analytics</label>
      <div className="flex flex-col h-full w-full">
        <label className="font-medium text-gray-400">
          General Statistics on {role === "admin" ? "Application" : user}
        </label>
        <div className="flex flex-col h-full md:flex-row mt-6">
          <div className="flex flex-col md:w-3/4">
            <div className="w-full h-full md:min-w-full md:min-h-full flex justify-center items-center p-2 rounded-lg">
              {chartData ? <LineChart data={chartData} /> : <ChartLoader />}
            </div>
          </div>

          <div className="w-full md:w-1/4 flex flex-col p-4 gap-5">
            <div className="flex flex-col gap-1 border-b-2 pb-2">
              <label className="text-lg font-bold">Total Users</label>
              {totalUser === "" ? (
                <div className="w-32 h-4 bg-red-300 rounded-full animate-pulse"></div>
              ) : (
                <label>{totalUser}</label>
              )}
              {totalUser === "" && prevTotalUser === "" ? (
                <div className="w-48 h-4 bg-red-300 rounded-full animate-pulse"></div>
              ) : (
                <label>
                  <label
                    className={
                      dau - prevDayActivity >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {totalUser - prevTotalUser >= 0
                      ? `+${totalUser - prevTotalUser}`
                      : `-${totalUser - prevTotalUser}`}{" "}
                  </label>
                  In Previous Day
                </label>
              )}
            </div>
            <div className="flex flex-col gap-1 border-b-2 pb-2">
              <label className="text-lg font-bold">Total User Activities</label>
              {dau === "" ? (
                <div className="w-32 h-4 bg-red-300 animate-pulse rounded-full"></div>
              ) : (
                <label>{dau}</label>
              )}
              {dau === "" && prevDayActivity === "" ? (
                <div className="w-48 h-4 bg-red-300 rounded-full animate-pulse"></div>
              ) : (
                <label>
                  <label
                    className={
                      dau - prevDayActivity >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {dau - prevDayActivity >= 0
                      ? `+${dau - prevDayActivity}`
                      : `${dau - prevDayActivity}`}{" "}
                  </label>
                  In Previous Day
                </label>
              )}
            </div>
            <div className="flex flex-col gap-1 border-b-2 pb-2">
              <label className="text-lg font-bold">
                Average Session Duration
              </label>
              <label>{formatDuration(avgSession)}</label>
              <label>
                <label
                  className={`${
                    avgSession - prevAvgSession > 0
                      ? `${"text-green-400"}`
                      : `${"text-red-400"}`
                  }`}
                >
                  {avgSession - prevAvgSession > 0
                    ? `+${formatDuration(avgSession - prevAvgSession)}`
                    : `-${formatDuration(prevAvgSession - avgSession)}`}
                </label>{" "}
                In Previous Day
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
