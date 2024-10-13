import React from "react";
import Table from "./Table";
import Header from "./Header";
import BookingAnalytics from "./BookingAnalytics";
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
        <BookingAnalytics />
      </div>
    </div>
  );
}

export default Body;
