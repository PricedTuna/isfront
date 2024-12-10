import { useEffect } from 'react'
import { useAuth } from '../../common/context/AuthContext'
import { Outlet, useNavigate } from 'react-router';

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : null;
}


export default ProtectedRoute
