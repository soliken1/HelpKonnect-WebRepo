import React from "react";
import CardContainer from "./CardContainer";
function Body() {
  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Resources</label>
      <label className="font-medium text-gray-400">
        Pending Mental Health Resources on Sample Facility
      </label>
      <div>
        <button className="bg-green-400 mt-10 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-full shadow-md shadow-green-300">
          All
        </button>
      </div>
      <CardContainer />
    </div>
  );
}

export default Body;
