import React, { useEffect, useState } from "react";
import { getTotalFacilityCount } from "@/utils/totalFacility";
import Image from "next/image";
import Pulser from "../loaders/Facility/Pulser";
import { revenue } from "@/utils/revenue";
import { Rating } from "@mui/material";
function FacilityAnalytics({ selectedFacility, facilityDetails }) {
  const [totalFacilityCount, setTotalFacilityCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  useEffect(() => {
    const fetchTotalFacilityCount = async () => {
      const count = await getTotalFacilityCount();
      setTotalRevenue(await revenue());
      setTotalFacilityCount(count);
    };
    fetchTotalFacilityCount();
  }, []);

  return (
    <div className="w-1/3 flex flex-col gap-5 mt-5">
      <div className="w-full h-32 bg-gradient-to-br items-start from-red-300 rounded-md flex flex-col to-pink-400 p-4 group shadow-md">
        <label className="text-white text-lg group-hover:scale-105 transition-transform duration-300">
          Total Facility Partnered:
        </label>
        {totalFacilityCount ? (
          <label className="text-white text-6xl font-semibold group-hover:scale-105 transition-transform duration-300">
            {totalFacilityCount}
          </label>
        ) : (
          <Pulser
            classes={
              "h-8 w-1/2 bg-white animate-pulse duration-300 rounded-full mt-5"
            }
          />
        )}
      </div>
      <div className="w-full h-32 bg-gradient-to-br items-start from-red-300 rounded-md flex flex-col to-pink-400 p-4 group shadow-md">
        <label className="text-white text-lg group-hover:scale-105 transition-transform duration-300">
          Total Generated Revenue:
        </label>
        <label className="text-white text-6xl font-semibold group-hover:scale-105 transition-transform duration-300">
          ₱{totalRevenue}
        </label>
      </div>
      <div className="max-h-64 min-h-64 overflow-auto h-auto items-start rounded-md flex flex-col p-4 group shadow-md bg-white">
        {selectedFacility ? (
          <div className="flex flex-row gap-5">
            {facilityDetails && (
              <>
                <Image
                  src={facilityDetails.imageUrl}
                  alt="Facility Profile"
                  className="w-20 h-20 object-cover rounded-full mb-4 shadow-md"
                  width={80}
                  height={80}
                />
                <div className="flex flex-col">
                  <label className="text-lg font-semibold">
                    {selectedFacility.facilityName}
                  </label>
                  <label className="text-sm text-gray-500">
                    {facilityDetails.email}
                  </label>
                  <Rating
                    value={selectedFacility.averageRating}
                    precision={0.5}
                  />
                  <div className="mt-2">
                    <p className="text-sm text-gray-700">
                      {facilityDetails.facilityDescription}
                    </p>
                    <p className="text-sm text-gray-700">
                      {facilityDetails.facilityLocation}
                    </p>
                    <p className="text-sm text-gray-700">
                      <label className="font-bold">Joined On:</label>{" "}
                      {new Date(
                        facilityDetails.dateCreated.seconds * 1000
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Select a facility to view details</p>
        )}
      </div>
    </div>
  );
}

export default FacilityAnalytics;
