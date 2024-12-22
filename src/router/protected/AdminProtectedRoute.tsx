import { useEffect, useState } from 'react';
import { useAuth } from '../../common/context/AuthContext';
import { Outlet, useNavigate } from 'react-router';
import LoginForm from '../../pages/login/LoginFormPage';

function AdminProtectedRoute() {
  const { isAuthenticated, isAdmin, login } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si la sesión está en el localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken && !isAuthenticated) {
      // Si el contexto no tiene la sesión, pero está en el localStorage, actualizamos el estado
      const parsedUser = JSON.parse(storedUser);
      login(parsedUser);
    }

    setIsChecked(true); // Marcar como verificado
  }, [isAuthenticated, login]);

  useEffect(() => {
    if (isChecked) {
      if (!isAuthenticated) {
        navigate('/login'); // Redirigir al login si no está autenticado
      } else if (!isAdmin) {
        navigate('/home'); // Redirigir a la página principal si no es admin
      }
    }
  }, [isChecked, isAuthenticated, isAdmin, navigate]);

  if (!isChecked || !isAuthenticated || !isAdmin) {
    return <LoginForm />; // O un loading mientras verificamos
  }

  return <Outlet />; // Si es admin, mostrar las rutas protegidas
}

export default AdminProtectedRoute;
