import React from "react";
import {
  countBookingStatuses,
  countTotalBookingsForFacility,
} from "@/utils/bookingStatus";
import { countTotalGains } from "@/utils/checkPrice";

function BookingAnalytics({ bookings, facilityName }) {
  const { active, done } = countBookingStatuses(bookings);
  const totalBookings = countTotalBookingsForFacility(bookings, facilityName);
  const totalGains = countTotalGains(bookings, facilityName);
  return (
    <div className="flex-1 h-full flex flex-col gap-4">
      <div className="flex flex-col gap-2 text-center w-full py-8 rounded-md from-red-300 to-pink-400 bg-gradient-to-br hover:to-pink-600 duration-300 group">
        <label className="text-5xl text-white font-semibold group-hover:scale-110 transition-transform duration-300">
          ₱{totalGains.toLocaleString()}
        </label>
        <label className="text-white group-hover:scale-110 transition-transform duration-300">
          Total Gains By Bookings
        </label>
      </div>
      <div className="flex flex-col gap-2 rounded-md text-center w-full py-8 bg-gradient-to-br from-green-500 to-emerald-600 hover:to-emerald-700 duration-100 group">
        <label className="text-5xl text-white font-semibold group-hover:scale-110 transition-transform duration-300">
          {active}
        </label>
        <label className="text-white group-hover:scale-110 transition-transform duration-300">
          Active Reservation
        </label>
      </div>
      <div className="flex items-center gap-2 flex-col rounded-md justify-center from-red-600 to-red-700 bg-gradient-to-br hover:to-pink-600 duration-300 flex-1 group">
        <label className="text-5xl text-white font-semibold group-hover:scale-110 transition-transform duration-300">
          {done}
        </label>
        <label className="text-white group-hover:scale-110 transition-transform duration-300">
          Done
        </label>
      </div>
      <div className="flex flex-col p-4 flex-1 w-full from-red-300 to-pink-400 bg-gradient-to-br hover:to-pink-600 duration-300 rounded-md">
        <label className="text-lg font-semibold text-white">
          Total Books From Users:
        </label>
        <label className="text-6xl font-semibold text-white">
          {totalBookings}
        </label>
      </div>
    </div>
  );
}

export default BookingAnalytics;
