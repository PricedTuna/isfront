import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/home/HomePage";

// Rutas para no administradores
export const PublicRouter = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },
];