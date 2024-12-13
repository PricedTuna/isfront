import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import useGetAsistenciasBySesionTrabajo from "../../../common/hooks/asistencia/useGetAsistenciasBySesionTrabajo";

function SesionTrabajoPage() {
  const { id } = useParams<{ id: string }>(); // Obtener el parámetro `id` de la URL
  
  const { asistencias, fetchAsistenciasBySesionTrabajo } = useGetAsistenciasBySesionTrabajo();

  useEffect(() => {
    if (id) {
      const numericId = parseInt(id, 10); // Convertir el parámetro a número
      fetchAsistenciasBySesionTrabajo(numericId); // Pasar el id como parámetro
    }
  }, [id]);

  return (
    <Box maxWidth="800px" margin="0 auto" mt={4} p={3} border="1px solid #ccc" borderRadius="8px">
      <Typography variant="h4" textAlign="center" mb={3}>
        Detalles de la Sesión de Trabajo
      </Typography>

      {/* Información General */}
      <Box mb={4}>
        <Typography variant="h6">Información General</Typography>
        <Typography variant="body1">
          <strong>ID de Sesión:</strong> {id}
        </Typography>
      </Box>

      {/* Tabla de asistencias */}
      <Box>
        <Typography variant="h6" mb={2}>
          Asistencias
        </Typography>
        {asistencias && asistencias.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID Asistencia</strong></TableCell>
                  <TableCell><strong>ID Empleado</strong></TableCell>
                  <TableCell><strong>Tipo de Asistencia</strong></TableCell>
                  <TableCell><strong>Inicio</strong></TableCell>
                  <TableCell><strong>Fin</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asistencias.map((asistencia) => (
                  <TableRow key={asistencia.idAsistencia}>
                    <TableCell>{asistencia.idAsistencia}</TableCell>
                    <TableCell>{asistencia.idEmpleado}</TableCell>
                    <TableCell>{asistencia.idTipoAsistencia}</TableCell>
                    <TableCell>
                      {new Date(asistencia.asistenciaInicio).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {asistencia.asistenciaFin
                        ? new Date(asistencia.asistenciaFin).toLocaleString()
                        : "En curso"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No hay asistencias registradas para esta sesión.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default SesionTrabajoPage;
