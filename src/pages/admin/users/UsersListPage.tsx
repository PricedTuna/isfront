import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { UserDto } from "../../../dtos/user/User";
import { UserService } from "../../../services/UserService";
import GenericList from "../../../components/List";
import { useEffect } from "react";
import useGetUsers from "./hooks/useGetUsers";

const UsersListPage = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const _userService = new UserService();

  // Hook personalizado para gestionar usuarios
  const { users, fetchUsers } = useGetUsers();

  useEffect(() => {
    fetchUsers(); // Solo se ejecutará una vez al montar el componente
  }, [fetchUsers]);

  const handleEdit = (user: UserDto) => {
    navigate("/admin/users/crear", { state: user }); // Navega a la página de creación y pasa el usuario como estado
  };

  const handleDelete = async (id: number) => {
    await _userService.delete(id);
    fetchUsers(); // Refresca la lista después de eliminar
  };

  return (
    <Box mt={4} gap={2}>
      {users == undefined ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={80} />
        </Box>
      ) : (
        <GenericList<UserDto>
          title="Listado de Usuarios"
          items={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          filterKeys={["nombreUsuario", "correo", "idEmpleado"]}
          getItemId={(user) => user.idUsuario}
          getItemLabel={(user) => user.nombreUsuario}
        />
      )}
    </Box>
  );
};

export default UsersListPage;
