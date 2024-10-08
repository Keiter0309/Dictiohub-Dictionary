import axios from "axios";
import { EAdmin } from "../../enums/Auth/EAuth";

class AdminServices {
  public static async loginAdmin(email: string, password: string) {
    try {
      const response = await axios.post(
        `${EAdmin.ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_LOGIN}`,
        { email, password }
      );

      return response.data.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

  public static async fetchUsers() {
    try {
      const response = await axios.get(
        `${EAdmin.ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_FETCH_USERS}`
      );
      if (response) {
        return response.data.data.users;
      }
    } catch (error) {
      console.error(error);
    }
  }

  public static async fetchUser(email: string) {
    try {
      const response = await axios.get(
        `${EAdmin.ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_FETCH_USER}/${email}`
      );

      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  public static async createUser(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      const response = await axios.post(
        `${EAdmin.ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_CREATE_USER}`,
        { firstName, lastName, username, email, password, role }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  public static async deleteUser(email: string) {
    try {
      const response = await axios.delete(
        `${EAdmin.ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_DELETE_USER}/${email}`
      );

      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }

  public static async updateUser(
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    role: string
  ) {
    try {
      const response = await axios.put(
        `
        ${EAdmin.ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_UPDATE_USER}/${id}`,
        { firstName, lastName, username, email, role }

      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default AdminServices;
