import { Box, List, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UsuariosList from "../../../components/UsuariosList";
import { UserDto } from "../../../dtos/user/User";
import useGetUsers from "./hooks/useGetUsers";

function UsersAdminPage() {
  const [usuarios, setUsuarios] = useState<UserDto[]>();
  const { getUsers } = useGetUsers();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        if (Array.isArray(response)) {
          setUsuarios(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  return (
    <Box p={2}>
      <Typography textAlign="center" py={2} variant="h2">
        Admin panel
      </Typography>
      <Box>
        <List>
          {usuarios == undefined ? (
            <Typography>No se han encontrado ningun usuario</Typography>
          ) : (
            <UsuariosList
              onDelete={() => console.log("delete user")}
              onEdit={() => {
                console.log("edit user");
              }}
              users={usuarios}
            />
          )}
        </List>
      </Box>
    </Box>
  );
}

export default UsersAdminPage;
