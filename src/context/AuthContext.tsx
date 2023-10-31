import { createContext, useState } from "react";
import { AllowedRole } from "../util/enums";

export type AuthUser = {
  userId: string;
  roles: AllowedRole[];
  exp: number;
  iat: number;
};

export type Auth = {
  accessToken: string;
  user: AuthUser;
};

export type UserInfo = {
  first_name: string;
  last_name: string;
  email: string;
  confirmed: boolean;
  is_active: boolean;
  is_approved: boolean;
};

export type AuthContextType = {
  auth: Auth | null;
  setAuth: (auth: Auth | null) => void;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderType = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
