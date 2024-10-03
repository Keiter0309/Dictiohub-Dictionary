import axios from "axios";
import { EAuth } from "../../enums/Auth/EAuth";
import { Cookies } from "react-cookie";

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
        const errorData = err.response.data;
        if (errorData.message) {
          if (errorData.message === "User already registerd") {
            throw new Error("User already registered");
          } else if (errorData.message === "Password does not match") {
            throw new Error("Password does not match");
          } else if (errorData.message === "Username already taken") {
            throw new Error("Username already taken");
          }
        }
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
      const userId = response.data.data["id"];
      const cookies = new Cookies();
      cookies.set("token", 'true', {
        maxAge: 3600,
      });

      localStorage.setItem("id", userId);
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
