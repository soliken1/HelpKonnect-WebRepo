import React from "react";

function Table() {
  return (
    <div className="w-full flex flex-col p-10">
      <label className="text-lg font-bold">Professionals</label>
      <label className="font-medium text-gray-400">
        Professional List on Sample Facility
      </label>
      <div className="flex justify-end mt-10 mb-4">
        <button className="bg-green-400 ps-10 pe-10 pt-2 pb-2 text-white font-semibold rounded-xl shadow-md shadow-gray-400">
          Add Professional
        </button>
      </div>
      <div className="overflow-x-auto shadow-sm shadow-red-50">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Professional Name
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Email
              </th>
              <th className="py-3 px-4 bg-red-100 font-bold text-sm text-gray-600 border-b border-gray-300">
                Qualification
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
                john.doe@example.com
              </td>
              <td className="py-3 px-4 text-center text-gray-700 border-b border-gray-300">
                Psychotherapist License
              </td>
              <td className="py-3 px-4 text-center border-b text-green-600 border-gray-300">
                Active
              </td>
            </tr>
            <tr>
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
            <tr>
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
      </div>
    </div>
  );
}

export default Table;
