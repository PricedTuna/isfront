import { useEffect } from 'react'
import { useAuth } from '../../common/context/AuthContext'
import { Outlet, useNavigate } from 'react-router';
import LoginForm from '../../pages/login/LoginFormPage';

function ProtectedRoute() {

  const AuthContext = useAuth();
  const navigate = useNavigate();

  if(AuthContext == undefined) {
    return <LoginForm />
  }

  const {isAuthenticated} = AuthContext;

  useEffect(() => {
    
    if(!isAuthenticated){
      navigate("/login");
    }

  }, [])

  return (
    <Outlet />
  )
  

}

export default ProtectedRoute
