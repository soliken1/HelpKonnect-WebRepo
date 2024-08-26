"use client";
import React from "react";

function Detailform({ username }) {
  return (
    <div className="h-96 mt-5 px-4">
      <form className="h-auto">
        <div className="flex flex-row justify-center items-center gap-5">
          <input
            id="username"
            type="text"
            value={username}
            className="text-3xl font-semibold text-center w-60 h-10 bg-white"
            disabled={true}
          />
          <button type="button">
            <img className="w-6 h-6" src="/Icons/EditIcon.png" />
          </button>
        </div>
        <div className="flex flex-row h-80 mt-7 px-4">
          <div className="flex flex-col gap-7 w-1/3">
            <label className="text-lg font-semibold">Description: </label>
            <label className="text-lg font-semibold">Location: </label>
            <label className="text-lg font-semibold">Contact Number: </label>
          </div>
          <div className="flex flex-col gap-9 w-1/2">
            <div className="flex flex-row gap-9">
              <input
                type="text"
                className="w-5/6 bg-white text-start"
                value="A Long Description Here That Would Tell A Description Of The Facility"
                disabled={true}
              />
              <button type="button">
                <img className="w-6 h-6" src="/Icons/EditIcon.png" />
              </button>
            </div>
            <div className="flex flex-row gap-9">
              <input
                type="text"
                className="w-5/6 bg-white text-start"
                value="23rd Elsewhere St."
                disabled={true}
              />
              <button type="button">
                <img className="w-6 h-6" src="/Icons/EditIcon.png" />
              </button>
            </div>
            <div className="flex flex-row gap-9">
              <input
                type="text"
                className="w-5/6 bg-white text-start"
                value="+63 9123 456 789"
                disabled={true}
              />
              <button type="button">
                <img className="w-6 h-6" src="/Icons/EditIcon.png" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Detailform;
