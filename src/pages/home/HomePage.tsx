import { Box, List, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { UserService } from '../../services/UserService';
import UsuariosList from '../../components/UsuariosList';
import { GetLoginUserDto } from '../../dtos/usuarios/GetLoginUserDto';

function HomePage() {
  const [usuarios, setUsuarios] = useState<GetLoginUserDto[]>();
  const userService = new UserService();

  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const response = await userService.getAll();
        if (Array.isArray(response)) {
          setUsuarios(response);
        }
      } catch (error) {
        console.error("Error fetching autos:", error);
      }
    };

    fetchAutos();
  });
  
  return (
    <Box p={2} >
      <Typography textAlign="center" py={2} variant='h2'>Admin panel</Typography>
      
      <Box>
        {/* <Link to="/autos">
          <Button variant="outlined">Ir hacia autos</Button>
        </Link> */}

          <List>
            {
              usuarios == undefined
              ? <Typography>No se han encontrado ningun usuario</Typography>
              : <UsuariosList onDelete={() => console.log("delete user")} onEdit={() => {console.log("edit user")}} users={usuarios} />
            }
          </List>

      </Box>
    </Box>
  )
}

export default HomePage
