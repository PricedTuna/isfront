import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useGetTipoAsistenciaName } from "../../../common/hooks/asistencia/getTiposAsistenciaName";
import { GetAsistenciaDto } from "../../../dtos/asistencia/GetAsistenciaDto";
import { showDecisionAlert } from "../../../utils/AlertUtils";
import { useNavigate } from "react-router";

interface HistorialAsistenciasTableProps {
  asistencias: GetAsistenciaDto[] | null;
  tiposAsistencia: any[];
  onFinalizar: (idAsistencia: number) => void; // Función para manejar la acción "Finalizar"
}

function HistorialAsistenciasTable({
  asistencias,
  tiposAsistencia,
  onFinalizar,
}: HistorialAsistenciasTableProps) {
  const navigate = useNavigate();

  const handleFinalizar = (idAsistencia: number) => {
    showDecisionAlert({
      title: "Finalizar asistencia",
      message: "¿Estás seguro que deseas finalizar la asistencia?",
      prefersDarkMode: true,
      confirmButtonText: "Finalizar",
      cancelButtonText: "Cancelar",
      onConfirm: () => onFinalizar(idAsistencia),
      onCancel: () => {},
    });
  };

  if (!asistencias || asistencias.length === 0)
    return <Typography>No hay asistencias registradas.</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sesion de trabajo</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Inicio</TableCell>
            <TableCell>Fin</TableCell>
            <TableCell>Acciones</TableCell> {/* Nueva columna para acciones */}
          </TableRow>
        </TableHead>
        <TableBody>
          {asistencias.map((asistencia) => (
            <TableRow key={asistencia.idAsistencia}>
              <TableCell>{asistencia.idSesionTrabajo}</TableCell>
              <TableCell>
                {useGetTipoAsistenciaName(asistencia, tiposAsistencia)}
              </TableCell>
              <TableCell>
                {new Date(asistencia.asistenciaInicio).toLocaleString()}
              </TableCell>
              <TableCell>
                {asistencia.asistenciaFin
                  ? new Date(asistencia.asistenciaFin).toLocaleString()
                  : "En progreso"}
              </TableCell>
              <TableCell>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                  {!asistencia.asistenciaFin && (
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleFinalizar(asistencia.idAsistencia)}
                    >
                      Finalizar
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      navigate(`/asistenciaInfo/${asistencia.idAsistencia}`)
                    }
                  >
                    Detalles
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HistorialAsistenciasTable;
