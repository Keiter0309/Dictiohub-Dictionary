export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IAuthResponse {
  message: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
  otp: number;
  firstName: string;
}

export interface IResetPassword {
  firstName: string;
  email: string;
  otp: number;
  password: string;
  confirmPassword: string;
  resetPasswordOTP: number;
  resetPasswordExpires: Date;
}

export interface IChangePassword {
  firstName: string;
  email: string;
  password: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
