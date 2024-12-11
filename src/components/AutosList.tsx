import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { Auto } from "../dtos/autos/AutoDto";

type AutoListProps = {
  autos: Auto[];
  onEdit: (auto: Auto) => void;
  onDelete: (id: number) => void;
};

const AutoList = ({ autos, onEdit, onDelete }: AutoListProps) => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la busqueda

  // Filtro para buscar por cualquier dato menos por fecha
  const filteredAutos = autos.filter((auto) => {
    return (
      auto.nombreModelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auto.yearModelo.toString().includes(searchTerm) ||
      auto.numeroPlacas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auto.numeroSerie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      auto.numeroPoliza.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Box>
      <Typography
        variant="h4"
        textAlign="center"
        fontFamily={"Rubik"}
        fontSize={30}
        marginBottom={2}
      >
        Listado de Autos
      </Typography>

      {/* Field para buscar */}
      <Box textAlign="center" marginBottom={3}>
        <TextField
          label="Buscar autos"
          variant="outlined"
          fullWidth
          sx={{ maxWidth: "80%", margin: "0 auto" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {filteredAutos.length > 0 ? (
        <List
          sx={{
            maxWidth: "80%", 
            margin: "0 auto",
            bgcolor: "background.paper", 
          }}
        >
          {filteredAutos.map((auto) => (
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
      ) : (
        <Typography textAlign="center" color="text.secondary">
          No se encontraron autos.
        </Typography>
      )}
    </Box>
  );
};

export default AutoList;
