import React from "react";

function Table() {
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
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-100 cursor-pointer">
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            Man's Search For Meaning
          </td>
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            Kenneth James
          </td>
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            1/1/2024
          </td>
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            E-Book
          </td>
        </tr>
        <tr className="hover:bg-gray-100 cursor-pointer">
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            Sample Audio
          </td>
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            Alvin John
          </td>
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            2/2/2024
          </td>
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            Audio
          </td>
        </tr>
        <tr className="hover:bg-gray-100 cursor-pointer">
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            Sample Video
          </td>
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            Franz Ruie
          </td>
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            3/3/2024
          </td>
          <td className="py-3 px-4 text-center text-sm text-gray-700 border-b border-gray-300">
            Video
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
