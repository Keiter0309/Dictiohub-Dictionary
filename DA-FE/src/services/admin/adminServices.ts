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
}

export default AdminServices;
