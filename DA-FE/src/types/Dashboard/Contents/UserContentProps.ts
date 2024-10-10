export interface UserContentProps {
  onSubmit: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    role: string
  ) => void;
}

export interface UserContentState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: string;
}
