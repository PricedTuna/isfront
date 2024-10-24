import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "../pages/login/LoginFormPage";
import LandingPage from "../pages/landing/LandingPage";
import ProtectedRoute from "./protected/ProtectedRoute";
import AdminProtectedRoute from "./protected/AdminProtectedRoute";
import { PublicRouter } from "./PublicRouter";
import { AdminRouter } from "./AdminRouter";

const router = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginForm />,
    errorElement: <LoginForm />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, // Rutas protegidas para usuarios autenticados
    children: PublicRouter,
  },
  {
    path: "/",
    element: <AdminProtectedRoute />, // Rutas protegidas para administradores
    children: AdminRouter,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
