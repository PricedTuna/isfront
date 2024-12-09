import { createContext, ReactNode, useContext, useState } from "react";
import { loginUserDto } from "../../dtos/auth/GetLoginUserDto";

// Definimos el tipo de los valores del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  user: loginUserDto | undefined;
  isAdmin: boolean;
  login: (user: loginUserDto) => void;
  logout: () => void;
}

// Creamos el contexto con un valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<loginUserDto>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const login = (user: loginUserDto) => {
    setIsAuthenticated(true);
    setIsAdmin(user.isAdmin);
    setUser(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ isAdmin, isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para utilizar el contexto facilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
