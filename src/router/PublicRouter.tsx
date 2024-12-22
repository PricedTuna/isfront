import EditProfile from "../components/profile/EditProfile";
import MainLayout from "../layout/MainLayout";
import AsistenciaPage from "../pages/home/asistencias/AsistenciaPage";
import AsistenciasPage from "../pages/home/asistencias/AsistenciasPage";
import HomePage from "../pages/home/HomePage";
import ProfilePage from "../pages/user/ProfilePage";

const baseUrl: string = "/";
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
      {
        path: `${baseUrl}profile`,
        element: <ProfilePage />,
      },
      {
        path: "editarperfil",
        element: <EditProfile />,
        errorElement: <EditProfile />,
      },
      {
        path: "asistencias",
        element: <AsistenciasPage />,
        errorElement: <AsistenciasPage />,
      },
      {
        path: "asistenciaInfo/:id",
        element: <AsistenciaPage />,
        errorElement: <AsistenciaPage />,
      },
    ],
  },
];
