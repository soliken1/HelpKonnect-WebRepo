import React from "react";

function Table() {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Professional Name
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            User
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
            Date
          </th>
          <th className="p-4 bg-red-300 font-bold text-sm text-white border-b border-gray-300">
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
            Alvin John
          </td>
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            1/1/2024
          </td>
          <td className="py-3 px-4 text-center border-b text-red-500 border-gray-300">
            Finished
          </td>
        </tr>
        <tr className="hover:bg-gray-100 cursor-pointer">
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            Jane Smith
          </td>
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            Kenneth James
          </td>
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            2/2/2024
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
            Franz Ruie
          </td>
          <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
            3/3/2024
          </td>
          <td className="py-3 px-4 text-center border-b text-yellow-500 border-gray-300">
            In-Progress
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
