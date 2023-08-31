import { createContext, useState } from "react";

type AuthUser = {
  email: string;
  name: string;
  exp: number;
  iat: number;
  is_approved: boolean;
  roles: string[];
  userId: string;
};

export type Auth = {
  accessToken: string;
  user: AuthUser;
};

export type AuthContextType = {
  auth: any;
  setAuth: any;
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
