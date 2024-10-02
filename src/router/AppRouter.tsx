import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "../pages/login/LoginFormPage";
import AutosPage from "../pages/autos/AutosPage";
import AutoCreatePage from "../pages/autos/AutosCreatePage";
import AutosListPage from "../pages/autos/AutosListPage";
import LandingPage from "../pages/landing/LandingPage";
import ProtectedRoute from "./protected/ProtectedRoute";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/home/HomePage";

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
    element: <ProtectedRoute />,
    errorElement: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "", // Ruta relativa, no debería ser "/"
            element: <HomePage />,
          },
          {
            path: "/home", // Ruta relativa, sin "/"
            element: <HomePage />,
          },
          {
            path: "/autos", // Ruta relativa, sin "/"
            element: <AutosPage />,
            errorElement: <AutosPage />,
            children: [
              {
                path: "", // Ruta relativa para la lista de autos
                element: <AutosListPage />,
                errorElement: <AutosListPage />,
              },
              {
                path: "crear", // Ruta relativa para crear autos
                element: <AutoCreatePage />,
                errorElement: <AutoCreatePage />,
              },
              {
                path: "editar", // Ruta relativa para editar autos
                element: <AutoCreatePage />,
                errorElement: <AutoCreatePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
