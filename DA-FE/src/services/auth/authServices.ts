import axios from "axios";
import { EAuth } from "../../enums/Auth/EAuth";

class AuthServices {
  public async register(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) {
    const payload = {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
    };

    try {
      const response = await axios.post(
        `${EAuth.AUTH_CLIENT_HOST}/${EAuth.AUTH_REGISTER}`,
        payload
      );
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        throw err.response.data;
      } else {
        throw new Error(err);
      }
    }
  }

  public async login(email: string, password: string) {
    try {
      const response = await axios.post(
        `${EAuth.AUTH_CLIENT_HOST}/${EAuth.AUTH_LOGIN}`,
        { email, password }
      );

      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        throw err.response.data;
      } else {
        throw new Error(err);
      }
    }
  }
}

export default new AuthServices();
