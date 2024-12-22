import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginUserDto } from "../../dtos/auth/GetLoginUserDto";

// Definimos el tipo de los valores del contexto
interface AuthContextType {
  isAuthenticated: boolean;
  user: LoginUserDto | undefined;
  isAdmin: boolean;
  login: (user: LoginUserDto) => void;
  logout: () => void;
}

// Creamos el contexto con un valor inicial
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<LoginUserDto>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const isTokenExpired = (token: string) => {
    try {
      const payloadBase64 = token.split(".")[1];
      if (!payloadBase64) {
        console.error("El token no tiene un payload válido");
        return true;
      }
      const payload = JSON.parse(atob(payloadBase64)); // Decodificar JWT
      return payload.exp * 1000 < Date.now(); // Verificar expiración
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return true; // Considerar el token como expirado si ocurre un error
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken) {
      if (!isTokenExpired(storedToken)) {
        const parsedUser = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setIsAdmin(parsedUser.isAdmin);
        setUser(parsedUser);
      } else {
        console.warn("El token ha expirado. Se limpiará la sesión.");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (user: LoginUserDto) => {
    setIsAuthenticated(true);
    setIsAdmin(user.isAdmin);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(undefined);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
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

export const useGetUserContext = () => {
  const { user } = useAuth();
  return user;
};
