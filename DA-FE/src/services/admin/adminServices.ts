import axios from "axios";
import { EAdmin } from "../../enums/Auth/EAuth";

class AdminServices {
  public static async loginAdmin(email: string, password: string) {
    try {
      const response = await axios.post(
        `${EAdmin.ADMIN_CLIENT_HOST}/${EAdmin.ADMIN_LOGIN}`,
        { email, password }
      );

      return response.data;
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
}

export default AdminServices;
