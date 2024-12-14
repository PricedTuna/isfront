import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useGetTipoAsistenciaName } from "../../../common/hooks/asistencia/getTiposAsistenciaName";
import useGetAsistenciasBySesionTrabajo from "../../../common/hooks/asistencia/useGetAsistenciasBySesionTrabajo";
import useGetTiposAsistencia from "../../../common/hooks/asistencia/useGetTiposAsistencia";
import useGetSesionTrabajoById from "../../../common/hooks/sesionesTarbajo/useGetSesionTrabajoById";
import { formatDate } from "../../../utils/formatDate";
import { QRCodeCanvas } from "qrcode.react";

function SesionTrabajoPage() {
  const { id: idSesionTrabajo } = useParams<{ id: string }>(); // Obtener el parámetro `id` de la URL

  const { asistencias, fetchAsistenciasBySesionTrabajo } =
    useGetAsistenciasBySesionTrabajo();
  const { fetchSesionTrabajoById, sesionTrabajo } = useGetSesionTrabajoById();
  const { fetchTiposAsistencia, tiposAsistencia } = useGetTiposAsistencia();

  useEffect(() => {
    if (!idSesionTrabajo) return;

    fetchAsistenciasBySesionTrabajo(+idSesionTrabajo);
    fetchSesionTrabajoById(+idSesionTrabajo);
    fetchTiposAsistencia();
  }, [idSesionTrabajo]);

  return !sesionTrabajo ? (
    <></>
  ) : (
    <Box
      maxWidth="800px"
      margin="0 auto"
      mt={4}
      p={3}
      border="1px solid #ccc"
      borderRadius="8px"
    >
      <Typography variant="h4" textAlign="center" mb={3}>
        Detalles de la Sesión de Trabajo
      </Typography>

      <Box display={"flex"} justifyContent={"center"}>
        <QRCodeCanvas value={sesionTrabajo.sesionToken} size={300} />
      </Box>

      {/* Información General */}
      <Box mb={4}>
        <Typography variant="h6">Información General</Typography>
        <Typography variant="body1">
          <strong>ID de Sesión:</strong> {idSesionTrabajo}
        </Typography>
        <Typography variant="body1">
          <strong>Token de la sesión:</strong> {sesionTrabajo.sesionToken}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha inicio:</strong>{" "}
          {formatDate(new Date(sesionTrabajo.createDate))}
        </Typography>
        <Typography variant="body1">
          <strong>Fecha cierre:</strong> {idSesionTrabajo}
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
                  <TableCell>
                    <strong>ID Asistencia</strong>
                  </TableCell>
                  <TableCell>
                    <strong>ID Empleado</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Tipo de Asistencia</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Inicio</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Fin</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {asistencias.map((asistencia) => (
                  <TableRow key={asistencia.idAsistencia}>
                    <TableCell>{asistencia.idAsistencia}</TableCell>
                    <TableCell>{asistencia.idEmpleado}</TableCell>
                    <TableCell>
                      {useGetTipoAsistenciaName(asistencia, tiposAsistencia)}
                    </TableCell>
                    <TableCell>
                      {formatDate(new Date(asistencia.asistenciaInicio))}
                    </TableCell>
                    <TableCell>
                      {asistencia.asistenciaFin
                        ? formatDate(new Date(asistencia.asistenciaFin))
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
