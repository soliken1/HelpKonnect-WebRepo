import React from "react";
import Table from "./Table";
import Header from "./Header";
function Body({ user }) {
  return (
    <div className="w-full flex flex-col p-10">
      <Header user={user} />
      <div className="h-20 flex flex-row gap-5 items-center w-full mt-2">
        <button
          className="shadow-md py-2 px-8 rounded-full hover:bg-red-300 duration-300 hover:text-white"
          type="button"
        >
          Today
        </button>
        <button
          className="shadow-md py-2 px-8 rounded-full hover:bg-red-300 duration-300 hover:text-white"
          type="button"
        >
          Active
        </button>
      </div>
      <div className="flex flex-row gap-4 flex-nowrap h-full">
        <div className="overflow-x-auto shadow-md rounded-md w-9/12 mt-2">
          <Table />
        </div>
        <div className="flex-1 h-full flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center w-full py-8 rounded-md from-red-300 to-red-500 bg-gradient-to-br hover:to-red-600 duration-100 group">
            <label className="text-5xl text-white font-semibold group-hover:scale-110 transition-transform duration-300">
              ₱20 000
            </label>
            <label className="text-white group-hover:scale-110 transition-transform duration-300">
              Total Gains By Bookings
            </label>
          </div>
          <div className="flex flex-col gap-2 rounded-md text-center w-full py-8 bg-gradient-to-br from-green-500 to-emerald-600 hover:to-emerald-700 duration-100 group">
            <label className="text-5xl text-white font-semibold group-hover:scale-110 transition-transform duration-300">
              1
            </label>
            <label className="text-white group-hover:scale-110 transition-transform duration-300">
              Active Reservation
            </label>
          </div>
          <div className="flex flex-row w-full h-32 gap-4">
            <div className="flex items-center flex-col justify-center rounded-md bg-gradient-to-br from-yellow-200 to-yellow-400 hover:to-yellow-500 flex-1 group">
              <label className="text-3xl text-white font-semibold group-hover:scale-110 transition-transform duration-300">
                1
              </label>
              <label className="text-white group-hover:scale-110 transition-transform duration-300">
                In-Progress
              </label>
            </div>
            <div className="flex items-center flex-col rounded-md justify-center from-red-300 to-red-500 bg-gradient-to-br hover:to-red-600 duration-100 flex-1 group">
              <label className="text-3xl text-white font-semibold group-hover:scale-110 transition-transform duration-300">
                1
              </label>
              <label className="text-white group-hover:scale-110 transition-transform duration-300">
                Done
              </label>
            </div>
          </div>
          <div className="flex flex-col p-4 flex-1 w-full from-red-300 to-red-500 bg-gradient-to-br hover:to-red-600 duration-100 rounded-md">
            <label className="text-lg font-semibold text-white">
              Total Books From Users:
            </label>
            <label className="text-6xl font-semibold text-white">3</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
