import React, { createContext, useContext, useState } from "react";

interface ProviderProps {
  currentUser: string | null;
  updateUser: (data: any) => void;
  signed: boolean;
}

const AuthContext = createContext<ProviderProps>({
  currentUser: null,
  updateUser: (data) => {},
  signed: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("user") || null
  );

  const updateUser = (data: any) => {
    localStorage.setItem("user", JSON.stringify(data));
    setCurrentUser(data);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, updateUser, signed: !!currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
