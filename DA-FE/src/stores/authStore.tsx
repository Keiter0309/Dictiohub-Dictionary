import { create } from 'zustand';
import { LoginFormProps } from '../types/Users/Auth';
import { axiosInstance } from '../libs/axios';
import { EAuth } from '../enums/Auth/EAuth';
import { message } from 'antd';

interface AuthState {
  authUser: any;
  isCheckingAuth: boolean;
  isLoggingIn: boolean;
  isSignuping: boolean;
  login: (formData: { email: string; password: string }) => Promise<void>;
  checkAuth: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isLoggingIn: false,
  isSignuping: false,

  login: async (formData: LoginFormProps) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post(
        `${EAuth.AUTH_LOGIN}`,
        formData,
      );
      set({ authUser: response.data });
      message.success('Logged in succesfully');
      console.log(response.data);
    } catch (error: any) {
      console.error('Error in login', error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get(EAuth.AUTH_CHECK, {
        withCredentials: true,
      });
      set({ authUser: response.data });
    } catch (error: any) {
      console.error('Error in check auth', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post(
        EAuth.AUTH_LOGOUT,
        {},
        { withCredentials: true },
      );
      set({ authUser: null });
    } catch (error: any) {
      console.error('Error in logout', error);
    }
  },
}));

export default useAuthStore;
