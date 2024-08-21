import React from "react";

function Table() {
  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Bookings</label>
      <label className="font-medium text-gray-400">
        User Bookings on Sample Facility
      </label>
      <div className="overflow-x-auto shadow-sm shadow-red-50 mt-24">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Professional Name
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                User
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Date
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
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
            <tr>
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
            <tr>
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
      </div>
    </div>
  );
}

export default Table;
