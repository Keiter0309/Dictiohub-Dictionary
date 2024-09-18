export interface SignupFormProps {
  onSubmit: (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  ) => void;
}

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
