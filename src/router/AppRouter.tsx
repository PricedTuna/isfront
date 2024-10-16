import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "../pages/login/LoginFormPage";
import LandingPage from "../pages/landing/LandingPage";
import ProtectedRoute from "./protected/ProtectedRoute";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import AutosPage from "../pages/admin/autos/AutosPage";
import AutosListPage from "../pages/admin/autos/AutosListPage";
import AutoCreatePage from "../pages/admin/autos/AutosCreatePage";
import AdminPage from "../pages/admin/AdminPage";

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
            path: "admin", // Ruta relativa
            element: <AdminPage />,
            children: [
              {
                path: "home", // Ruta relativa
                element: <HomePage />,
              },
              {
                path: "autos", // Ruta relativa
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
          {
            path: "home", // Ruta relativa
            element: <HomePage />,
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
