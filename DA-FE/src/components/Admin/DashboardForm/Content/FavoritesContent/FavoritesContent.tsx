import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { ChevronUp, Plus, Search } from 'lucide-react';
import { Input, Pagination } from 'antd';
import { favoriteData } from '../../../../../utils/Data/Data';
import { favoriteMock } from '../../../../../mock/Admin/Dashboard/Content/favorite.mock';

const FavoritesContent: React.FC = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {favoriteData.map((favoriteData) => (
          <div
            key={favoriteData.id}
            className="bg-white p-5 rounded-md shadow-lg col-span-1 md:w-full transition-all duration-200 ease-in-out"
          >
            <div className="text-xl font-semibold text-gray-800 mb-10">
              <div className="flex justify-between">
                <span className="whitespace-nowrap">{favoriteData.title}</span>
                {favoriteData.icon}
              </div>
            </div>
            <p className="text-2xl text-gray-800 font-semibold">
              {favoriteData.value}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-10 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search favorite."
            className="shadow-md px-2 py-2 pl-10 rounded-md border w-full md:w-64"
          />
          <Search className="absolute left-2 top-2 text-gray-500 w-6 h-6" />
        </div>
        <button className="bg-blue-500 hover:bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center transition-all duration-200 ease-linear w-full md:w-auto">
          <Plus className="mr-2 w-5 h-5" />
          Add favorite
        </button>
      </div>

      {/* favorite table */}
      <div className="bg-white mt-5 rounded-md shadow-md overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-200">
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                ID
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700 flex gap-x-2">
                Favorite
                <button>
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                </button>
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Added By User
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Date Added
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {favoriteMock.map((favorite) => (
            <tr className="border-b border-gray-200">
              <td className="py-3 px-5 text-left font-semibold text-gray-700">
                {favorite.id}
              </td>
              <td className="py-3 px-5 text-left font-semibold text-gray-700">
                {favorite.word}
              </td>
              <td className="py-3 px-5 text-left font-semibold text-gray-700">
                {favorite.user}
              </td>
              <td className="py-3 px-5 text-left font-semibold text-gray-700">
                {favorite.added}
              </td>
              <td className="py-3 px-5 text-left font-semibold text-gray-700">
                <button className="text-blue-500 hover:text-blue-700 transition-all duration-200 ease-linear ml-3">
                  <Pencil className="" />
                </button>
                <button className="text-red-500 hover:text-red-700 transition-all duration-200 ease-linear ml-3">
                  <Trash2 className="" />
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center items-center p-5">
          <Pagination current={1} total={10} />
        </div>
      </div>
    </>
  );
};

export default FavoritesContent;
