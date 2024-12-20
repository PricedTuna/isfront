import MainLayout from "../layout/MainLayout";
import AdminPage from "../pages/admin/AdminPage";
import AutoCreatePage from "../pages/admin/autos/AutosCreatePage";
import AutosListPage from "../pages/admin/autos/AutosListPage";
import AutosPage from "../pages/admin/autos/AutosPage";
import SesionesTrabajoPage from "../pages/admin/sesionesTrabajo/SesionesTrabajoPage";
import SesionTrabajoPage from "../pages/admin/sesionesTrabajo/SesionTrabajoPage";
import UsersAdminPage from "../pages/admin/users/UsersAdminPage";
import CiudadesPage from "../pages/catalogs/ciudadesPage";
import NacionalidadesPage from "../pages/catalogs/nacionalidadesPage";
import TiposLicenciaPage from "../pages/catalogs/TiposLicenciaPage";
import TiposPermisosPage from "../pages/admin/tipospermisos/TiposPermisosPage";
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
import TiposPermisosListPage from "../pages/admin/tipospermisos/TiposPermisosListPage";
import TiposPermisosCreatePage from "../pages/admin/tipospermisos/TiposPermisosCreatePage";
import TipoContratoPage from '../pages/admin/tipocontrato/TipoContratoPage';
import TipoContratoCreatePage from '../pages/admin/tipocontrato/TipoContratoCreatePage';
import TipoContratoListPage from '../pages/admin/tipocontrato/TipoContratoListPage';
import TipoAsistenciaListPage from '../pages/admin/tipoasistencia/TipoAsistenciaListPage';
import TipoAsistenciaCreatePage from '../pages/admin/tipoasistencia/TipoAsistenciaCreatePage';
import TipoAsistenciaPage from '../pages/admin/tipoasistencia/TipoAsistenciaPage';
import TipoEmpleadoPage from '../pages/admin/tipoempleado/TipoEmpleadoPage';
import TipoEmpleadoListPage from '../pages/admin/tipoempleado/TipoEmpleadoListPage';
import TipoEmpleadoCreatePage from '../pages/admin/tipoempleado/TipoEmpleadoCreatePage';
const baseUrl: string = "admin";

// Rutas para administradores
export const AdminRouter = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: `${baseUrl}/sesionTrabajo/:id`,
        element: <SesionTrabajoPage />,
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
        errorElement: <UsersAdminPage />, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <UsersListPage />,
            errorElement: <UsersListPage />,
          },
          {
            path: "crear",
            element: <UsersCreatePage />,
            errorElement: <UsersCreatePage />,
          },
          {
            path: "editar",
            element: <UsersCreatePage />,
            errorElement: <UsersCreatePage />,
          },
        ],
      },
      {
        path: `${baseUrl}/nacionalidades`,
        element: <NacionalidadesPage />,
        errorElement: <NacionalidadesPage />, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <NacionalidadList />,
            errorElement: <NacionalidadList />,
          },
          {
            path: "crear",
            element: <NacionalidadesForm />,
            errorElement: <NacionalidadesForm />,
          },
          {
            path: "editar",
            element: <NacionalidadesForm />,
            errorElement: <NacionalidadesForm />,
          },
        ],
      },
      {
        path: `${baseUrl}/domicilio`,
        element: <DomicilioPage />,
        errorElement: <DomicilioPage />, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <DomiciliosListPage />,
            errorElement: <DomiciliosListPage />,
          },
          {
            path: "crear",
            element: <DomicilioCreatePage />,
            errorElement: <DomicilioCreatePage />,
          },
          {
            path: "editar",
            element: <DomicilioCreatePage />,
            errorElement: <DomicilioCreatePage />,
          },
        ],
      },

      {
        path: `${baseUrl}/sucursal`,
        element: <SucursalPage />,
        errorElement: <SucursalPage />, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <SucursalListPage />,
            errorElement: <SucursalListPage />,
          },
          {
            path: "crear",
            element: <SucursalCreatePage />,
            errorElement: <SucursalCreatePage />,
          },
          {
            path: "editar",
            element: <SucursalCreatePage />,
            errorElement: <SucursalCreatePage />,
          },
        ],
      },
      {
        path: `${baseUrl}/empleados`,
        element: <EmpleadoPage />,
        errorElement: <EmpleadoPage />, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <EmpleadoListPage />,
            errorElement: <EmpleadoListPage />,
          },
          {
            path: "crear",
            element: <EmpleadoCreatePage />,
            errorElement: <EmpleadoCreatePage />,
          },
          {
            path: "editar",
            element: <EmpleadoCreatePage />,
            errorElement: <EmpleadoCreatePage />,
          },
        ],
      },
      {
        path: `${baseUrl}/sesionesTrabajo`,
        element: <SesionesTrabajoPage />,
      },
      {
        path: `${baseUrl}/ciudades`,
        element: <CiudadesPage />,
      },
      {

        path:`${baseUrl}/tipocontrato`,
        element: <TipoContratoPage/>,
        errorElement: <TipoContratoPage/>, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <TipoContratoListPage/>,
            errorElement: <TipoContratoListPage/>,
          },
          {
            path: "crear",
            element: <TipoContratoCreatePage/>,
            errorElement: <TipoContratoCreatePage/>,
          },
          {
            path: "editar",
            element:<TipoContratoCreatePage/>,
            errorElement: <TipoContratoCreatePage/>,
          },
          
        ],
      },
      {
        path: `${baseUrl}/tipoasistencia`,
        element: <TipoAsistenciaPage/>,
        errorElement: <TipoAsistenciaPage/>, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <TipoAsistenciaListPage/>,
            errorElement: <TipoAsistenciaListPage/>,
          },
          {
            path: "crear",
            element: <TipoAsistenciaCreatePage/>,
            errorElement: <TipoAsistenciaCreatePage/>,
          },
          {
            path: "editar",
            element:<TipoAsistenciaCreatePage/>,
            errorElement: <TipoAsistenciaCreatePage/>,
          },
          
        ],
      },
      {
        path: `${baseUrl}/tipoempleado`,
        element: <TipoEmpleadoPage/>,
        errorElement: <TipoEmpleadoPage/>, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <TipoEmpleadoListPage/>,
            errorElement: <TipoEmpleadoListPage/>,
          },
          {
            path: "crear",
            element: <TipoEmpleadoCreatePage/>,
            errorElement: <TipoEmpleadoCreatePage/>,
          },
          {
            path: "editar",
            element:<TipoEmpleadoCreatePage/>,
            errorElement: <TipoEmpleadoCreatePage/>,
          },
          
        ],
      },
      {
        path: `${baseUrl}/tiposlicencia`,
        element: <TiposLicenciaPage />,
      },
      {

        path:`${baseUrl}/tipospermisos`,
        element: <TiposPermisosPage/>,
        errorElement: <TiposPermisosPage/>, // todo: refactor name (add admin)
        children: [
          {
            path: "",
            element: <TiposPermisosListPage/>,
            errorElement: <TiposPermisosListPage/>,
          },
          {
            path: "crear",
            element: <TiposPermisosCreatePage/>,
            errorElement: <TiposPermisosCreatePage/>,
          },
          {
            path: "editar",
            element:<TiposPermisosCreatePage/>,
            errorElement: <TiposPermisosCreatePage/>,
          },
          
        ],
      },

    ],
  },
];
