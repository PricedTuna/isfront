import { Box, List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import { Auto } from '../dtos/autos/AutoDto';

type AutoListProps = {
  autos: Auto[];
  onEdit: (auto: Auto) => void; // Cambiamos el tipo para recibir un objeto Auto
  onDelete: (id: number) => void;
};

const AutoList = ({ autos, onEdit, onDelete }: AutoListProps) => {

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lista de Autos
      </Typography>
      <List>
        {autos.map((auto) => (
          <ListItem key={auto.idAuto} secondaryAction={
            <>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => onEdit(auto)} // Pasamos el objeto auto
                sx={{ marginRight: 1 }}
              >
                Editar
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => onDelete(auto.idAuto)}
              >
                Eliminar
              </Button>
            </>
          }>
            <ListItemText primary={auto.nombreModelo} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AutoList;
