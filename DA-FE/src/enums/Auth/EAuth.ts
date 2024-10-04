export enum EAuth {
  AUTH_REGISTER = "api/v1/auth/register",
  AUTH_LOGIN = "api/v1/auth/login",
  AUTH_FORGOT_PASSWORD = "api/v1/auth/forgot-password",
  AUTH_RESET_PASSWORD = "api/v1/auth/reset-password",
  AUTH_CHANGE_PASSWORD = "api/v1/auth/change-password",
  AUTH_CLIENT_HOST = "http://localhost:9000",
}

export enum EAdmin {
  ADMIN_CLIENT_HOST = "http://localhost:9000",
  ADMIN_LOGIN = "api/v1/admin/login",
  ADMIN_FETCH_USERS = "api/v1/admin/users",
}
