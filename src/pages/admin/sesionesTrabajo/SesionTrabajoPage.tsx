import { Box, Divider, List, ListItem, Typography } from "@mui/material";
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
        {/* Aquí puedes incluir más detalles de la sesión si los tienes disponibles */}
      </Box>

      {/* Botón Finalizar */}
      

      {/* Asistencias */}
      <Box>
        <Typography variant="h6" mb={2}>
          Asistencias
        </Typography>
        {asistencias && asistencias.length > 0 ? (
          <List>
            {asistencias.map((asistencia) => (
              <Box key={asistencia.idAsistencia} mb={2}>
                <ListItem>
                  <Typography variant="body1">
                    <strong>ID de Asistencia:</strong> {asistencia.idAsistencia}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <strong>ID de Empleado:</strong> {asistencia.idEmpleado}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <strong>Tipo de Asistencia:</strong> {asistencia.idTipoAsistencia}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <strong>Inicio:</strong>{" "}
                    {new Date(asistencia.asistenciaInicio).toLocaleString()}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <strong>Fin:</strong>{" "}
                    {asistencia.asistenciaFin
                      ? new Date(asistencia.asistenciaFin).toLocaleString()
                      : "En curso"}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1">
                    <strong>Día:</strong>{" "}
                    {new Date(asistencia.diaAsistencia).toLocaleDateString()}
                  </Typography>
                </ListItem>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
          </List>
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
