import { useEffect } from 'react'
import { useAuth } from '../../common/context/AuthContext'
import { Outlet, useNavigate } from 'react-router';
import LoginForm from '../../pages/login/LoginFormPage';

function AdminProtectedRoute() {

  const AuthContext = useAuth();
  const navigate = useNavigate();

  if(AuthContext == undefined) {
    return <LoginForm />
  }

  const {isAdmin} = AuthContext;

  useEffect(() => {
    
    if(!isAdmin){
      navigate("/home");
    }

  }, [])

  return (
    <Outlet />
  )
  

}

export default AdminProtectedRoute
