import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";
import { Auto } from "../../../dtos/autos/AutoDto";
import { AutoService } from "../../../services/AutoService";
import AutoList from "../../../components/AutosList";
import useGetAutos from "./hooks/use-get-autos";
import { useEffect } from "react";

const AutosListPage = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const _autoService = new AutoService();

  const { autos, fetchAutos } = useGetAutos();

  useEffect(() => {
    fetchAutos();
  }, [fetchAutos])

  const handleEdit = (auto: Auto) => {
    navigate("/admin/autos/crear", { state: auto }); // Navega a la página de creación y pasa el auto como estado
  };

  const handleDelete = async (id: number) => {
    await _autoService.delete(id);
    fetchAutos();
  };

  return (
    <Box mt={4} gap={2}>
      {autos == undefined ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={80} />
        </Box>
      ) : (
        <AutoList autos={autos} onDelete={handleDelete} onEdit={handleEdit} />
      )}
    </Box>
  );
};

export default AutosListPage;
