import React from "react";

function Card() {
  return (
    <div className="flex flex-col w-80 h-80 shadow-md shadow-red-200 border border-1 border-red-400 rounded-lg p-5 gap-3 hover:w-96 hover:h-80 transition-all duration-700">
      <label className="text-black font-bold">E-Book</label>
      <label className="text-black font-semibold">
        Man's Search For Meaning
      </label>
      <label className="text-gray-400 text-sm h-28">
        The book focuses on love, hope, responsibility, inner freedom, and the
        beauty to be found in both nature and art as means that help one endure
        and overcome harrowing experiences.
      </label>
      <a className="underline text-violet-400" href="" target="_blank">
        mans-search-for-meaning.pdf
      </a>
      <div className="flex justify-evenly mt-4">
        <button className="bg-green-400 text-white pt-1 pb-1 ps-4 pe-4 rounded-full shadow-md shadow-green-200">
          Approve
        </button>
        <button className="bg-red-400 text-white pt-1 pb-1 ps-4 pe-4 rounded-full shadow-md shadow-red-200">
          Deny
        </button>
      </div>
    </div>
  );
}

export default Card;
