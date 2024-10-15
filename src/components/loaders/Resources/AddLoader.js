import React from "react";

function AddLoader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 duration-1000">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-red-300"></div>
    </div>
  );
}

export default AddLoader;
