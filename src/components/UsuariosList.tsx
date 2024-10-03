import { UserDto } from '../dtos/usuarios/User';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';

type UserListProps = {
  users: UserDto[];
  onEdit: (user: UserDto) => void; // Cambiamos el tipo para recibir un objeto Auto
  onDelete: (id: number) => void;
};

function UsuariosList({onDelete, onEdit, users}: UserListProps) {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.idUsuario} secondaryAction={
            <>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => onEdit(user)} // Pasamos el objeto auto
                sx={{ marginRight: 1 }}
              >
                Editar
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => onDelete(user.idUsuario)}
              >
                Eliminar
              </Button>
            </>
          }>
            <ListItemText primary={user.correo} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default UsuariosList
