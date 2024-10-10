import React from "react";

function Table() {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="p-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
            Professional Name
          </th>
          <th className="p-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
            Email
          </th>
          <th className="p-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
            Qualification
          </th>
          <th className="p-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-100 cursor-pointer">
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            John Doe
          </td>
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            john.doe@example.com
          </td>
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            Psychotherapist License
          </td>
          <td className="py-3 px-4 text-center border-b text-green-600 border-gray-300">
            Active
          </td>
        </tr>
        <tr className="hover:bg-gray-100 cursor-pointer">
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            Jane Smith
          </td>
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            jane.smith@example.com
          </td>
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            Psychotherapist License
          </td>
          <td className="py-3 px-4 text-center border-b text-green-600 border-gray-300">
            Active
          </td>
        </tr>
        <tr className="hover:bg-gray-100 cursor-pointer">
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            Michael Brown
          </td>
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            michael.brown@example.com
          </td>
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            Psychotherapist License
          </td>
          <td className="py-3 px-4 text-center border-b text-green-600 border-gray-300">
            Active
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
