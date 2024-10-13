import React from "react";

import formatDate from "@/utils/formatDate";

function Table({ resources, onRowClick }) {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Resource Name
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Professional Uploader
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Date
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Resource Type
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Approved
          </th>
        </tr>
      </thead>
      <tbody>
        {resources.map((resource) => (
          <tr
            key={resource.id}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => onRowClick(resource)}
          >
            <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
              {resource.name}
            </td>
            <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
              {resource.facilityName || resource.professionalName}
            </td>
            <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
              {formatDate(resource.time)}
            </td>
            <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
              {resource.type}
            </td>
            <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
              {resource.approved ? "Approved" : "Pending"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
