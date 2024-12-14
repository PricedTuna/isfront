import { useEffect } from 'react';
import { useAuth } from '../../common/context/AuthContext';
import { Outlet, useNavigate } from 'react-router';
import LoginForm from '../../pages/login/LoginFormPage';

function AdminProtectedRoute() {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir al login
      navigate('/login');
    } else if (!isAdmin) {
      // Si no es admin, redirigir a la página de inicio
      navigate('/home');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Si es un usuario autenticado y administrador, se renderiza la ruta protegida
  return <Outlet />;
}

export default AdminProtectedRoute;
