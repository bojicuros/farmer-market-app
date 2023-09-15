import { createContext, useState } from "react";
import { AllowedRole } from "../util/enums";

export type AuthUser = {
  email: string;
  name: string;
  exp: number;
  iat: number;
  is_approved: boolean;
  is_confirmed: boolean;
  is_active: boolean
  roles: AllowedRole[];
  userId: string;
};

export type Auth = {
  accessToken: string;
  user: AuthUser;
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
