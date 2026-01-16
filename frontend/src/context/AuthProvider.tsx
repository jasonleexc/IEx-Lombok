import React, { useEffect, createContext, useState, ReactNode } from "react";
import { AuthUser } from "../types/user";

type AuthContextType = {
  auth: AuthUser;
  setAuth: React.Dispatch<React.SetStateAction<AuthUser>>;
  logout: () => void;
};

const authContext = createContext<AuthContextType | undefined>(undefined);

// TODO: check whether local storage is the best way 
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthUser>({
    token: localStorage.getItem("token"),
    user: null
  });

useEffect(() => {
  if (auth.token) {
    localStorage.setItem("token", auth.token);
  } else {
    localStorage.removeItem("token"); 
  }
}, [auth.token]);

const logout = () => {
  setAuth({ token: null, user: null });
};

  return (
    <authContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};