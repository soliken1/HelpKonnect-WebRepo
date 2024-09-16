import React from "react";

function FlagListLoader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-4 border-b-2 flex flex-row items-center gap-3 animate-pulse">
        <div className="h-12 w-12 object-contain rounded-full bg-red-300"></div>
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 rounded-full bg-red-300"></div>
          <div className="w-48 h-4 rounded-full bg-red-300"></div>
        </div>
      </div>
      <div className="p-4 border-b-2 flex flex-row items-center gap-3 animate-pulse">
        <div className="h-12 w-12 object-contain rounded-full bg-red-300"></div>
        <div className="flex flex-col gap-2">
          <div className="w-32 h-4 rounded-full bg-red-300"></div>
          <div className="w-48 h-4 rounded-full bg-red-300"></div>
        </div>
      </div>
    </div>
  );
}

export default FlagListLoader;
