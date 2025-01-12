export interface SignupFormProps {
  onSubmit: (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
  ) => void;
}

export interface LoginFormProps {
  email: string;
  password: string;
}

export interface onSubmitLogin {
  onSubmit: (formData: LoginFormProps) => Promise<void>;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
