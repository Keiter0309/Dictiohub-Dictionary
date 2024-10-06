import React from "react";
import AdminServices from "../../../../services/admin/adminServices";
import UserContentForm from "../../../../components/Admin/DashboardForm/Content/UserContent/UserContent";

const UserContent: React.FC = () => {
  const handleCreateUser = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      const response = await AdminServices.createUser(
        firstName,
        lastName,
        username,
        email,
        password,
        role
      );

      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UserContentForm onSubmit={handleCreateUser} />
    </>
  );
};

export default UserContent;