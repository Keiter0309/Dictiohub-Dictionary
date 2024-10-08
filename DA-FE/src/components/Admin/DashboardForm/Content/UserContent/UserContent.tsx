import React, { useEffect, useState } from "react";
import { userData } from "../../../../../utils/Data/Data";
import { Pagination, Modal, Select, Input } from "antd";
import { Plus, Search, Pencil, Trash2, ChevronUp, Key } from "lucide-react";
import AdminServices from "../../../../../services/admin/adminServices";
import { UserContentProps } from "../../../../../types/Dashboard/Contents/UserContentProps";
import { Confirm } from "../../../../../utils/ToastData/Toast";
import formatDateTime from "../../../../../utils/Format/FormatDateTime";
import Fuse from "fuse.js";

const UserContentForm: React.FC<UserContentProps> = ({ onSubmit }) => {
  const userTableData = userData;
  const [currentPage, setCurrentPage] = useState(1);
  const [titleTable, setTitleTable] = useState("Add User");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await onSubmit(firstName, lastName, username, email, password, role);
      handleCloseModal();
      // Clear input fields
      setFirstName("");
      setLastName("");
      setUsername("");
      setPassword("");
      setEmail("");
      setRole("");
      // Fetch all users
      fetchAllUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (email: string) => {
    try {
      await AdminServices.deleteUser(email);
      fetchAllUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setEmail("");
    setRole("");
  };

  const handleEditUser = async (email: string) => {
    setShowModal(true);
    fetchUser(email);
    setTitleTable("Edit User");
  };

  const handleUpdateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await AdminServices.fetchUser(email);
      const { id } = response;
      await AdminServices.updateUser(id, firstName, lastName, username, email, role);
      handleCloseModal();
      fetchAllUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const generateRandomPassword = () => {
    length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      const at = Math.floor(Math.random() * charset.length);
      password += charset.charAt(at);
      setPassword(password);
    }

    return password;
  };

  const fetchAllUsers = async () => {
    try {
      const response = await AdminServices.fetchUsers();
      setUsers(response);
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const fetchUser = async (email: string) => {
    try {
      const response = await AdminServices.fetchUser(email);
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setUsername(response.username);
      setEmail(response.email);
      setRole(response.role);
      return response;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const showConfirmSwal = async (email: string) => {
    const result = await Confirm(
      `Are you sure you want to delete ${email}?`,
      "error"
    );
    if (result.isConfirmed) {
      handleDeleteUser(email);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
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
              {titleTable}
            </h3>
            <form className="flex flex-col gap-5" onSubmit={
              titleTable === "Add User"
                ? handleCreateUser
                : handleUpdateUser
            }>
              <Input
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input.Password
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={generateRandomPassword}
                className="bg-blue-500 hover:bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center transition-all duration-200 ease-linear"
              >
                <Key className="mr-2 w-5 h-5" />
                <span>Random password</span>
              </button>
              <Select
                placeholder="Select a role"
                className="w-full"
                value={role || "Select a role"}
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "editor", label: "Editor" },
                  { value: "viewer", label: "Viewer" },
                ]}
                onChange={(value) => setRole(value)}
              />
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="p-2 rounded-md shadow-sm bg-blue-500 hover:bg-indigo-500 transition-all duration-300 text-white w-24"
                >
                  Submit
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
              <th className="py-3 px-5 text-left font-semibold text-gray-700">
                ID
              </th>
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
            {users.map((user: any) => {
              return (
                <tr className="hover:bg-gray-50" key={user.id}>
                  <td className="py-3 px-5 text-left">
                    {users.indexOf(user) + 1}
                  </td>
                  <td className="py-3 px-5 text-left">{user.username}</td>
                  <td className="py-3 px-5 text-left">{user.email}</td>
                  <td className="py-3 px-5 text-left">{user.role}</td>
                  <td className="py-3 px-5 text-left">
                    {formatDateTime(user.lastLogin)}
                  </td>
                  <td className="py-3 px-5 text-left">{user.wordsAdded}</td>
                  <td className="py-3 px-5 text-left">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition-all duration-300"
                      onClick={() => {
                        handleEditUser(user.email);
                      }}
                    >
                      <Pencil />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-3"
                      onClick={() => showConfirmSwal(user.email)}
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center items-center p-5">
          <Pagination
            current={currentPage}
            total={users.length}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UserContentForm;
