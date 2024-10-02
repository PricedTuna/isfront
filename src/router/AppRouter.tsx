import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "../pages/login/LoginFormPage";
import AutosPage from "../pages/autos/AutosPage";
import AutoCreatePage from "../pages/autos/AutosCreatePage";
import AutosListPage from "../pages/autos/AutosListPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <LoginForm />,
    errorElement: <LoginForm />,
  },
  {
    path: "/autos",
    element: <AutosPage /> ,
    errorElement: <AutosPage />,
    children: [
      {
        path: "",
        element: <AutosListPage />,
        errorElement: <AutosListPage />
      },
      {
        path: "crear",
        element: <AutoCreatePage />,
        errorElement: <AutoCreatePage />
      },
      {
        path: "editar",
        element: <AutoCreatePage />,
        errorElement: <AutoCreatePage />
      }
    ]
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
