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
import DonutChart from "./DonutChart";
import Image from "next/image";

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
    <div className="flex flex-col w-screen h-screen px-10 py-6">
      <label className="text-lg font-bold">Analytics</label>
      <label className="font-medium text-gray-400">
        General Statistics on {role === "admin" ? "Application" : user}
      </label>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col h-full md:flex-row mt-6">
          <div className="flex flex-col md:w-3/4 md:h-full">
            <div className="w-full h-full md:min-w-full md:min-h-full flex p-2 rounded-lg flex-col gap-2">
              {chartData ? <LineChart data={chartData} /> : <ChartLoader />}
              <div className="flex flex-row justify-evenly items-center mt-auto mb-auto">
                <div className="w-60 h-28 relative border-2 min-h-28 bg-gradient-to-br from-green-500 to-emerald-600 hover:scale-105 duration-200 p-4 flex flex-col rounded-md">
                  <label className="font-bold text-white">Happy Users</label>
                  <label className="text-3xl text-green-300">200</label>
                  <label className="text-white text-sm">
                    +200 <label className="text-white">In Previous Day</label>
                  </label>
                  <Image
                    src="/SmileIcon.svg"
                    className="absolute bottom-0 right-2 opacity-10 transform translate-x-3"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="w-60 relative h-28 border-2 bg-gradient-to-br min-h-28 from-red-400 to-rose-600 hover:scale-105 duration-200 p-4 flex flex-col rounded-md">
                  <label className="font-bold text-white">Sad Users</label>
                  <label className="text-3xl text-red-300">0</label>
                  <label className="text-white text-sm">
                    -200 <label className="text-white">In Previous Day</label>
                  </label>
                  <Image
                    src="/FrownIcon.svg"
                    className="absolute bottom-0 right-2 opacity-10 transform translate-x-3"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 flex flex-col px-4 pt-4 pb-8 gap-5">
            <label>Detailed Analytics</label>
            <div className="flex justify-center items-center pb-4 rounded-md shadow-md duration-75 hover:scale-105">
              <div className="h-48">
                {chartData ? <DonutChart data={chartData} /> : ""}
              </div>
            </div>
            <div className="flex relative flex-col gap-1 bg-gradient-to-br min-h-28 from-green-500 to-emerald-600 hover:scale-105 duration-200 px-4 py-2 shadow-md rounded-md">
              <label className="text-lg text-white font-bold">
                Total Users
              </label>
              {totalUser === "" ? (
                <div className="w-32 h-4 bg-green-400 rounded-full animate-pulse"></div>
              ) : (
                <label className="text-green-300 text-2xl">{totalUser}</label>
              )}
              {totalUser === "" && prevTotalUser === "" ? (
                <div className="w-48 h-4 bg-green-400 rounded-full animate-pulse"></div>
              ) : (
                <label className="text-white">
                  <label
                    className={
                      totalUser - prevTotalUser >= 0
                        ? "text-green-100"
                        : "text-red-100"
                    }
                  >
                    {totalUser - prevTotalUser >= 0
                      ? `+${prevTotalUser}`
                      : `${prevTotalUser}`}{" "}
                  </label>
                  In Previous Day
                </label>
              )}
              <Image
                src="/UserIcon.svg"
                className="absolute transform translate-y-4 translate-x-4 bottom-0 right-0 opacity-10"
                width={140}
                height={140}
              />
            </div>
            <div
              className={`flex relative flex-col gap-1 px-4 py-2 shadow-md min-h-28 rounded-md duration-300 hover:scale-105 ${
                dau - prevDayActivity >= 0
                  ? "bg-gradient-to-br from-green-500 to-emerald-600"
                  : "bg-gradient-to-br from-red-400 to-rose-600"
              }`}
            >
              <label className="text-lg text-white font-bold">
                Total User Activities
              </label>
              {dau === "" ? (
                <div className="w-32 h-4 bg-green-400 animate-pulse rounded-full"></div>
              ) : (
                <label
                  className={`text-2xl ${
                    dau - prevDayActivity >= 0
                      ? "text-green-300"
                      : "text-red-300"
                  }`}
                >
                  {dau}
                </label>
              )}
              {dau === "" && prevDayActivity === "" ? (
                <div className="w-48 h-4 bg-green-400 rounded-full animate-pulse"></div>
              ) : (
                <label className="text-white">
                  <label
                    className={
                      dau - prevDayActivity >= 0
                        ? "text-green-100"
                        : "text-red-100"
                    }
                  >
                    {dau - prevDayActivity >= 0
                      ? `+${dau - prevDayActivity}`
                      : `${dau - prevDayActivity}`}{" "}
                  </label>
                  In Previous Day
                </label>
              )}
              <Image
                src="/SendIcon.svg"
                className="absolute bottom-0 right-2 opacity-10"
                width={100}
                height={100}
              />
            </div>
            <div
              className={`flex flex-col relative gap-1 px-4 py-2 shadow-md min-h-28 rounded-md duration-300 hover:scale-105 ${
                avgSession - prevAvgSession > 0
                  ? "bg-gradient-to-br from-green-500 to-emerald-600"
                  : "bg-gradient-to-br from-red-400 to-rose-600"
              }`}
            >
              <label className="text-lg text-white font-bold">
                Average Session Duration
              </label>
              <label
                className={`text-2xl ${
                  avgSession - prevAvgSession > 0
                    ? "text-green-300"
                    : "text-red-300"
                }`}
              >
                {formatDuration(avgSession)}
              </label>
              <label className="text-white">
                <label
                  className={`${
                    avgSession - prevAvgSession > 0
                      ? `${"text-green-100"}`
                      : `${"text-red-100"}`
                  }`}
                >
                  {avgSession - prevAvgSession > 0
                    ? `+${formatDuration(avgSession - prevAvgSession)}`
                    : `-${formatDuration(prevAvgSession - avgSession)}`}
                </label>{" "}
                In Previous Day
              </label>
              <Image
                src="/ClockIcon.svg"
                className="absolute bottom-0 right-0 opacity-10"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
