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
          if (errorData.message === 'User already registered') {
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

      return response.data;
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

  public async logout() {
    try {
      const response = await axios.post(
        `${AUTH_CLIENT_HOST}/${EAuth.AUTH_LOGOUT}`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log('Logout successful:', response.data.message);
      return response.data.message;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error('Logout error (API response):', err.response.data);
          throw new Error(err.response.data.message || 'Logout failed');
        }
      }
      console.error('Logout error:', err.message);
      throw new Error('An unexpected error occurred while logging out.');
    }
  }

  public async forgotPassword(email: string) {
    try {
      const response = await axios.post(
        `${AUTH_CLIENT_HOST}/${EAuth.AUTH_FORGOT_PASSWORD}`,
        { email },
      );

      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async resetPassword(
    password: string,
    confirmPassword: string,
    otp: number,
  ) {
    try {
      const response = await axios.post(
        `${AUTH_CLIENT_HOST}/${EAuth.AUTH_RESET_PASSWORD}`,
        { password, confirmPassword, otp },
      );

      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) {
    try {
      const response = await axios.post(
        `${AUTH_CLIENT_HOST}/${EAuth.AUTH_CHANGE_PASSWORD}`,
        { oldPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
        },
      );

      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async checkAuth() {
    try {
      const response = await axios.get(
        `${AUTH_CLIENT_HOST}/${EAuth.AUTH_CHECK}`,
        {
          withCredentials: true,
        },
      );


      return response.data;
    } catch (err: any) {

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        return null;
      }

      throw new Error(
        'An unexpected error occurred while checking authentication.',
      );
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
