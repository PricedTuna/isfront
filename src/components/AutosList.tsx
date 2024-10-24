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
  onEdit: (auto: Auto) => void;
  onDelete: (id: number) => void;
};

const AutoList = ({ autos, onEdit, onDelete }: AutoListProps) => {
  console.log(JSON.stringify(autos.length, null, 2));
  return (
    <Box>
      {autos.length > 0 ? (
        <Box>
          <Typography variant="h4" textAlign="center">
            Listado de autos
          </Typography>
        </Box>
      ) : (
        <Typography textAlign="center">Aún no hay autos agregados</Typography>
      )}

      <List
        sx={{
          maxWidth: "80%", // Ancho máximo del 80%
          margin: "0 auto", // Centramos horizontalmente el elemento
          bgcolor: "background.paper", // Color de fondo si lo deseas
        }}
      >
        {autos.map((auto) => (
          <ListItem
            key={auto.idAuto}
            secondaryAction={
              <Box>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onEdit(auto)}
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
              </Box>
            }
          >
            <Box>
              <ListItemText primary={auto.nombreModelo} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AutoList;
