import MainLayout from "../layout/MainLayout";
import AdminPage from '../pages/admin/AdminPage';
import AutoCreatePage from "../pages/admin/autos/AutosCreatePage";
import AutosListPage from "../pages/admin/autos/AutosListPage";
import AutosPage from "../pages/admin/autos/AutosPage";
import SesionTrabajoPage from "../pages/admin/sesionesTrabajo/SesionTrabajoPage";
import UsersAdminPage from '../pages/admin/users/UsersAdminPage';
import CiudadesPage from "../pages/catalogs/ciudadesPage";
import NacionalidadesPage from "../pages/catalogs/nacionalidadesPage";
import TiposAsistenciaPage from "../pages/catalogs/TiposAsistenciaPage";
import TiposContratoPage from "../pages/catalogs/tiposContratoPage";
import TiposEmpleadosPage from "../pages/catalogs/TiposEmpleadosPage";
import TiposLicenciaPage from "../pages/catalogs/TiposLicenciaPage";
import TiposPermisosPage from "../pages/catalogs/TiposPermisosPage";
import UsersCreatePage from '../pages/admin/users/UsersCreatePage';
import NacionalidadesForm from '../pages/catalogs/components/nacionalidadesForm';
import NacionalidadList from "../components/NacionalidadList";
import UsersListPage from "../pages/admin/users/UsersListPage";
import DomicilioPage from "../pages/admin/domicilios/DomicilioPage";
import DomiciliosListPage from "../components/domicilio/DomicilioList";
import DomicilioCreatePage from "../pages/admin/domicilios/DomicilioCreatePage";
import SucursalPage from "../pages/admin/sucursales/SucursalPage";
import SucursalListPage from '../pages/admin/sucursales/SucursalListPage';
import SucursalCreatePage from '../pages/admin/sucursales/SucursalCreatePage';
import EmpleadoPage from '../pages/admin/empleado/EmpleadoPage';
import EmpleadoCreatePage from '../pages/admin/empleado/EmpleadoCreatePage';
import EmpleadoListPage from '../pages/admin/empleado/EmpleadoListPage';



const baseUrl: string = 'admin'

// Rutas para administradores
export const AdminRouter = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "admin",
        element: <AdminPage/>
      },
      {
        path: `${baseUrl}/sesionTrabajo/:id`,
        element: <SesionTrabajoPage />
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
        element:<UsersAdminPage/>,
        errorElement: <UsersAdminPage/>, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <UsersListPage/>,
            errorElement: <UsersListPage/>,
          },
          {
            path: "crear",
            element: <UsersCreatePage/>,
            errorElement: <UsersCreatePage/>,
          },
          {
            path: "editar",
            element: <UsersCreatePage/>,
            errorElement: <UsersCreatePage/>,
          },
        ],
      },
      {
        path: `${baseUrl}/nacionalidades`,
        element: <NacionalidadesPage />,
        errorElement: <NacionalidadesPage/>, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <NacionalidadList/>,
            errorElement: <NacionalidadList/>,
          },
          {
            path: "crear",
            element: <NacionalidadesForm/>,
            errorElement: <NacionalidadesForm/>,
          },
          {
            path: "editar",
            element: <NacionalidadesForm/>,
            errorElement: <NacionalidadesForm/>,
          },
        ],
      },
      {
        path: `${baseUrl}/domicilio`,
        element: <DomicilioPage />,
        errorElement: <DomicilioPage/>, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <DomiciliosListPage/>,
            errorElement: <DomiciliosListPage/>,
          },
          {
            path: "crear",
            element: <DomicilioCreatePage/>,
            errorElement: <DomicilioCreatePage/>,
          },
          {
            path: "editar",
            element:<DomicilioCreatePage/>,
            errorElement: <DomicilioCreatePage/>,
          },
          
        ],
      },
      
      {
        path: `${baseUrl}/sucursal`,
        element: <SucursalPage/>,
        errorElement: <SucursalPage/>, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <SucursalListPage/>,
            errorElement: <SucursalListPage/>,
          },
          {
            path: "crear",
            element: <SucursalCreatePage/>,
            errorElement: <SucursalCreatePage/>,
          },
          {
            path: "editar",
            element:<SucursalCreatePage/>,
            errorElement: <SucursalCreatePage/>,
          },
          
        ],
      },
      {
        path: `${baseUrl}/empleados`,
        element: <EmpleadoPage/>,
        errorElement: <EmpleadoPage/>, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <EmpleadoListPage/>,
            errorElement: <EmpleadoListPage/>,
          },
          {
            path: "crear",
            element: <EmpleadoCreatePage/>,
            errorElement: <EmpleadoCreatePage/>,
          },
          {
            path: "editar",
            element:<EmpleadoCreatePage/>,
            errorElement: <EmpleadoCreatePage/>,
          },
          
        ],
      },
      {
        path: `${baseUrl}/ciudades`,
        element: <CiudadesPage/>
      },
      {
        path:`${baseUrl}/tiposcontrato`,
        element: <TiposContratoPage/>
      },
      {
        path:`${baseUrl}/tiposasistencias`,
        element: <TiposAsistenciaPage/>
      },
      {
        path:`${baseUrl}/tiposempleados`,
        element: <TiposEmpleadosPage/>
      },
      {
        path:`${baseUrl}/tiposlicencia`,
        element: <TiposLicenciaPage/>
      },
      {
        path:`${baseUrl}/tipospermisos`,
        element: <TiposPermisosPage/>
      }

    ],
  },
];
