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
} from "@mui/material";
import { useGetTipoAsistenciaName } from "../../../common/hooks/asistencia/getTiposAsistenciaName";
import { GetAsistenciaDto } from "../../../dtos/asistencia/GetAsistenciaDto";

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
                {!asistencia.asistenciaFin && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onFinalizar(asistencia.idAsistencia)}
                  >
                    Finalizar
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HistorialAsistenciasTable;
