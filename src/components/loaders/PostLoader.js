import React from "react";

function PostLoader() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center px-10 py-2 gap-4 animate-pulse">
      <div className="w-full md:w-2/3 h-5/6 shadow-lg rounded-md bg-white flex flex-col">
        <div className="p-4">
          <div className="flex flex-row gap-2">
            <div className="w-12 h-12 rounded-full bg-red-300" />
            <div className="flex flex-col justify-center gap-2">
              <div className="bg-red-300 min-w-96 min-h-2 rounded-full"></div>
              <div className="bg-red-300 min-w-20 min-h-2 rounded-full"></div>
            </div>
          </div>
          <div className="bg-red-300 min-h-2 w-56 rounded-full mx-5 my-5"></div>
        </div>
        <div className="w-full flex-1 bg-red-300"></div>
      </div>
    </div>
  );
}

export default PostLoader;
