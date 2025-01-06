export interface AuthState {
  isAuthenticated: Boolean;
  user: { id: string | null; email: string | null };
}
