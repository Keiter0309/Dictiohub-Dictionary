export enum EAuth {
  AUTH_REGISTER = 'api/v1/auth/register',
  AUTH_LOGIN = 'api/v1/auth/login',
  AUTH_LOGOUT = 'api/v1/auth/logout',
  AUTH_FORGOT_PASSWORD = 'api/v1/auth/forgot-password',
  AUTH_RESET_PASSWORD = 'api/v1/auth/reset-password',
  AUTH_CHANGE_PASSWORD = 'api/v1/auth/change-password',
  AUTH_ME = 'api/v1/auth/me',
}

const AUTH_CLIENT_HOST: string = import.meta.env.VITE_API_BASE_URL;

export { AUTH_CLIENT_HOST };
