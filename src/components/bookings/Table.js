import React from "react";

import { getBookingStatus } from "@/utils/bookingStatus";

function Table({ bookings, handleRowClick }) {
  return (
    <table className="min-w-full overflow-auto">
      <thead>
        <tr>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Professional Username
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Username
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Date
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Cost
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Booking Status
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => {
          const { status, className } = getBookingStatus(booking.bookingDate);
          return (
            <tr
              key={booking.bookingId}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(booking)}
            >
              <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
                {booking.professional?.username}
              </td>
              <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
                {booking.user?.username}
              </td>
              <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
                {booking?.bookingDate}
              </td>
              <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
                ₱{booking?.amount}
              </td>
              <td
                className={`py-3 px-4 font-semibold text-center text-sm border-b border-gray-300 ${className}`}
              >
                {status}
              </td>
              <td
                className={`py-3 px-4 font-semibold text-center text-sm border-b border-gray-300 ${
                  booking?.status ? "text-green-400" : "text-yellow-400"
                }`}
              >
                {booking?.status ? "Completed" : "Pending"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
