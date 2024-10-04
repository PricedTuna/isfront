import { Box, Typography } from "@mui/material";
import AutoList from "../../components/AutosList";
import { Auto } from "../../dtos/autos/AutoDto";
import { useNavigate, useOutletContext } from "react-router";
import { AutoService } from "../../services/AutoService";

const AutosListPage = () => {
  const { autos } = useOutletContext<{ autos: Auto[] }>(); // Recupera el contexto
  const navigate = useNavigate(); // Hook para la navegación
  const _autoService = new AutoService();

  const handleEdit = (auto: Auto) => {
    navigate("/autos/crear", { state: auto }); // Navega a la página de creación y pasa el auto como estado
  };

  const handleDelete = async (id: number) => {
    await _autoService.delete(id);
  };

  return (
    <Box mt={4} gap={2}>
      {autos == undefined ? (
        <Typography textAlign="center" variant="h5">
          No hay acceso a la base de datos...
        </Typography>
      ) : (
        <AutoList autos={autos} onDelete={handleDelete} onEdit={handleEdit} />
      )}
    </Box>
  );
};

export default AutosListPage;
