import React from "react";

function Table({ professionals, onSelect }) {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Professional Name
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Email
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Qualification
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {professionals.map((professional) => (
          <tr
            key={professional.id}
            className="hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(professional)}
          >
            <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
              {professional.username}
            </td>
            <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
              {professional.email}
            </td>
            <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
              {professional.qualification || "None"}
            </td>
            <td className="py-3 px-4 text-center border-b text-green-600 border-gray-300">
              {professional.status || "Active"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
