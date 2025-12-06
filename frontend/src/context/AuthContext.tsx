import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../types/user"; 

type AuthContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  token: string | null;
  setToken: (t: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  // keep localStorage in sync (simple)
  const setTokenAndStore = (t: string | null) => {
    setToken(t);
    if (t) localStorage.setItem("token", t);
    else localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken: setTokenAndStore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
