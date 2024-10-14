import React from "react";

function FacilityTable({ facilities, onSelect }) {
  return (
    <div className="overflow-x-auto shadow-md w-2/3 rounded-md mt-5">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="p-4 rounded-tl-md bg-red-300 font-bold text-sm text-white border-b border-gray-300">
              Facility Name
            </th>
            <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
              No. Of Professionals
            </th>
            <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
              Total Successful Books
            </th>
            <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
              Generated Income
            </th>
            <th className="p-4 bg-red-300 rounded-tr-md font-bold text-sm text-white border-b border-gray-300">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {facilities.map((facility) => (
            <tr
              className="hover:bg-gray-100 cursor-pointer"
              key={facility.id}
              onClick={() => onSelect(facility)}
            >
              <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
                {facility.facilityName || "No Name"}
              </td>
              <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
                {facility.prof || 0}
              </td>
              <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
                {facility.books || 0}
              </td>
              <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
                {facility.income || 0}
              </td>
              <td
                className={`py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300 ${
                  facility.status ? "text-green-400" : "text-red-400"
                }`}
              >
                {facility.status ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FacilityTable;
