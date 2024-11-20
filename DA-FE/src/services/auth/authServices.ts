import axios from 'axios';
import { EAuth } from '../../enums/Auth/EAuth';
import { AUTH_CLIENT_HOST } from '../../enums/Auth/EAuth';

class AuthServices {
  public async register(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
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
        `${AUTH_CLIENT_HOST}/${EAuth.AUTH_REGISTER}`,
        payload,
      );
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const errorData = err.response.data;
        if (errorData.message) {
          if (errorData.message === 'User already registerd') {
            throw new Error('User already registered');
          } else if (errorData.message === 'Password does not match') {
            throw new Error('Password does not match');
          } else if (errorData.message === 'Username already taken') {
            throw new Error('Username already taken');
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
        `${AUTH_CLIENT_HOST}/${EAuth.AUTH_LOGIN}`,
        { email, password },
        {
          withCredentials: true,
        },
      );

      // Validate response structure
      if (response.data && response.data.data && response.data.data.id) {
        const userId = response.data.data.id;
        localStorage.setItem('id', userId);
        localStorage.setItem('token', 'true');

        return response.data;
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        console.error('Error logging in:', err.response.data);
        throw err.response.data;
      } else {
        console.error('Error logging in:', err.message);
        throw new Error(err.message);
      }
    }
  }

  public async getMe() {
    try {
      const response = await axios.get(`${AUTH_CLIENT_HOST}/${EAuth.AUTH_ME}`, {
        withCredentials: true,
      });
      if (response) {
        return response.data;
      }
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
