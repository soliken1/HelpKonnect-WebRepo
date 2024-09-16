"use client";
import React from "react";
import FlagList from "./FlagList";
import FlagContent from "./FlagContent";

function Body() {
  return (
    <div className="w-full h-full flex md:flex-row flex-col gap-5 p-10">
      <FlagList />
      <FlagContent />
    </div>
  );
}

export default Body;
