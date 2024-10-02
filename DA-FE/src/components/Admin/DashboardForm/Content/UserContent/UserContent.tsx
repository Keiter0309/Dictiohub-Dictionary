import React, { useState } from "react";
import { userData } from "../../../../../utils/Data/Data";
import { Pagination, Modal, Select, Input } from "antd";
import { Plus, Search, Pencil, Trash2, ChevronUp } from "lucide-react";

const UserContent: React.FC = () => {
  const userTableData = userData;
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {userTableData.map((user) => (
          <div
            key={user.id}
            className="bg-white p-5 rounded-md shadow-lg col-span-1 md:w-full transition-transform duration-200 ease-in-out"
          >
            <div className="text-xl font-semibold text-gray-800 mb-10">
              <div className="flex justify-between">
                <span className="whitespace-nowrap">{user.title}</span>
                {user.icon}
              </div>
            </div>
            <p className="text-2xl text-gray-800 font-semibold">{user.value}</p>
          </div>
        ))}
      </div>

      {/* Search user && add user */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search users..."
            className="shadow-md px-2 py-2 pl-10 rounded-md border w-full md:w-64"
          />
          <Search className="absolute left-2 top-2 text-gray-500 w-6 h-6" />
        </div>
        <button
          onClick={handleShowModal}
          className="bg-blue-500 hover:bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center transition-all duration-200 ease-linear w-full md:w-auto"
        >
          <Plus className="mr-2 w-5 h-5" />
          Add User
        </button>
        <Modal open={showModal} onCancel={handleCloseModal} footer={null}>
          <div className="p-5">
            <h3 className="text-xl font-semibold text-gray-800 mb-5">
              Add User
            </h3>
            <form action="" className="flex flex-col gap-5">
              <Input placeholder="Name" />
              <Input placeholder="Email" />
              <Select
                placeholder="Select a role"
                className="w-full"
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "editor", label: "Editor" },
                  { value: "viewer", label: "Viewer" },
                ]}
              />
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="p-2 rounded-md shadow-sm bg-blue-500 hover:bg-indigo-500 transition-all duration-300 text-white w-24"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>

      {/* User table */}
      <div className="bg-white mt-5 rounded-md shadow-md overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="border-b border-gray-200">
              <th className="py-3 px-5 text-left font-semibold text-gray-700 flex gap-x-2">
                Name
                <ChevronUp className="w-5 h-5 text-gray-500" />
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Role
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Last login
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Words Added
              </th>
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-5 text-left">John Doe</td>
              <td className="py-3 px-5 text-left">john.doe@example.com</td>
              <td className="py-3 px-5 text-left">Admin</td>
              <td className="py-3 px-5 text-left">2024-10-01</td>
              <td className="py-3 px-5 text-left">150</td>
              <td className="py-3 px-5 text-left">
                <button className="text-blue-500 hover:text-blue-700 transition-all duration-300">
                  <Pencil />
                </button>
                <button className="text-red-500 hover:text-red-700 ml-3">
                  <Trash2 />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-5 text-left">Jane Smith</td>
              <td className="py-3 px-5 text-left">jane.smith@example.com</td>
              <td className="py-3 px-5 text-left">Editor</td>
              <td className="py-3 px-5 text-left">2024-09-15</td>
              <td className="py-3 px-5 text-left">200</td>
              <td className="py-3 px-5 text-left">
                <button className="text-blue-500 hover:text-blue-700 transition-all duration-300">
                  <Pencil />
                </button>
                <button className="text-red-500 hover:text-red-700 ml-3">
                  <Trash2 />
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-5 text-left">Alice Johnson</td>
              <td className="py-3 px-5 text-left">alice.johnson@example.com</td>
              <td className="py-3 px-5 text-left">Viewer</td>
              <td className="py-3 px-5 text-left">2024-08-20</td>
              <td className="py-3 px-5 text-left">50</td>
              <td className="py-3 px-5 text-left">
                <button className="text-blue-500 hover:text-blue-700 transition-all duration-300">
                  <Pencil />
                </button>
                <button className="text-red-500 hover:text-red-700 ml-3">
                  <Trash2 />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center items-center p-5">
          <Pagination
            current={currentPage}
            total={50}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserContent;
