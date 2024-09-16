import React from "react";

function PostContainerLoader() {
  return (
    <div className="w-full md:w-2/3 h-full flex flex-col gap-5 px-3 py-6 items-center rounded-lg overflow-auto animate-pulse">
      <div className="min-w-full min-h-96 shadow-md flex flex-col gap-2 rounded-md p-4 bg-white">
        <div className="w-full flex flex-row gap-2">
          <div className="w-12 h-12 rounded-full bg-red-300"></div>
          <div className="flex flex-col gap-2">
            <div className="w-52 h-4 rounded-full bg-red-300"></div>
            <div className="w-32 h-2 rounded-full bg-red-300"></div>
          </div>
        </div>
        <div className="w-full flex-1 bg-red-300"></div>
      </div>
    </div>
  );
}

export default PostContainerLoader;
