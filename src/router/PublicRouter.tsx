import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import ProfilePage from '../pages/user/ProfilePage';
const baseUrl: string = '/'
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
        path: `${baseUrl}/profile/`,
        element: <ProfilePage/>
      },
    ],
  },
];