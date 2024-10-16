import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import { Auto } from "../dtos/autos/AutoDto";

type AutoListProps = {
  autos: Auto[];
  onEdit: (auto: Auto) => void; // Cambiamos el tipo para recibir un objeto Auto
  onDelete: (id: number) => void;
};

const AutoList = ({ autos, onEdit, onDelete }: AutoListProps) => {
  console.log(JSON.stringify(autos.length, null, 2));
  return (
    <Box>
      {autos.length > 0 ? (
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            Listado de autos
          </Typography>
        </Box>
      ) : (
        <Typography>Aún no hay autos agregados</Typography>
      )}

      <List>
        {autos.map((auto) => (
          <ListItem
            key={auto.idAuto}
            secondaryAction={
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
            }
          >
            <ListItemText primary={auto.nombreModelo} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AutoList;
