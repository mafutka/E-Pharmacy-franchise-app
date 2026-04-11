export type RegisterFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type AuthState = {
  token: string | null;
  isInitialized: boolean;

  setToken: (token: string | null) => void;
  logout: () => void;
  initAuth: () => Promise<void>;
};