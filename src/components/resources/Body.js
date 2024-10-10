import React from "react";
import Table from "./Table";
import Image from "next/image";
function Body() {
  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Resources</label>
      <label className="font-medium text-gray-400">
        Pending Mental Health Resources on Sample Facility
      </label>
      <div className="w-full">
        <button className="ps-10 pe-10 pt-2 pb-2 rounded-xl shadow-md hover:bg-red-300 hover:text-white duration-300 mt-5">
          All Resources
        </button>
      </div>
      <div className="flex flex-row gap-10 flex-nowrap h-full mt-5">
        <div className="overflow-x-auto shadow-md rounded-md w-8/12">
          <Table />
        </div>
        <div className="flex-1 shadow-md rounded-md">
          <Image src="" />
        </div>
      </div>
    </div>
  );
}

export default Body;
