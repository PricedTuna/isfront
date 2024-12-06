import AutosPage from "../pages/admin/autos/AutosPage";
import AutosListPage from "../pages/admin/autos/AutosListPage";
import AutoCreatePage from "../pages/admin/autos/AutosCreatePage";
import AdminPage from "../pages/admin/AdminPage";
import MainLayout from "../layout/MainLayout";
import UsersAdminPage from "../pages/admin/users/UsersAdminPage";
import NacionalidadesPage from "../pages/catalogs/nacionalidadesPage";
import CiudadesPage from "../pages/catalogs/ciudadesPage";

const baseUrl: string = 'admin'

// Rutas para administradores
export const AdminRouter = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "admin",
        element: <AdminPage />
      },
      {
        path: `${baseUrl}/autos`,
        element: <AutosPage />,
        errorElement: <AutosPage />, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <AutosListPage />,
            errorElement: <AutosListPage />,
          },
          {
            path: "crear",
            element: <AutoCreatePage />,
            errorElement: <AutoCreatePage />,
          },
          {
            path: "editar",
            element: <AutoCreatePage />,
            errorElement: <AutoCreatePage />,
          },
        ],
      },
      {
        path: `${baseUrl}/users`,
        element: <UsersAdminPage />,
      },
      {
        path: `${baseUrl}/nacionalidades`,
        element: <NacionalidadesPage />
      },
      {
        path: `${baseUrl}/ciudades`,
        element: <CiudadesPage/>
      }
    ],
  },
];
