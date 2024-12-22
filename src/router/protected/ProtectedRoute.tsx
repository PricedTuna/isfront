import { useEffect, useState } from 'react';
import { useAuth } from '../../common/context/AuthContext';
import { Outlet, useNavigate } from 'react-router';

function ProtectedRoute() {
  const { isAuthenticated, login } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si la sesión está en el localStorage (ya debería estar manejado en el contexto, pero revisamos aquí por seguridad)
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken && !isAuthenticated) {
      // Si no está autenticado en el contexto pero sí en el localStorage, actualizamos el estado
      const parsedUser = JSON.parse(storedUser);
      login(parsedUser);
    }
    
    // Marcar como verificado cuando todo esté listo
    setIsChecked(true);
  }, [isAuthenticated, login]);

  useEffect(() => {
    // Redirigir si no está autenticado después de verificar
    if (isChecked && !isAuthenticated) {
      navigate("/login");
    }
  }, [isChecked, isAuthenticated, navigate]);

  if (!isChecked || !isAuthenticated) {
    return null; // Mostrar loading o un fallback si es necesario
  }

  return <Outlet />;
}

export default ProtectedRoute;
