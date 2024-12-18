import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { useGetTipoAsistenciaName } from "../../../common/hooks/asistencia/getTiposAsistenciaName";
import { GetAsistenciaDto } from "../../../dtos/asistencia/GetAsistenciaDto";

interface HistorialAsistenciasTableProps {
  asistencias: GetAsistenciaDto[] | null;
  tiposAsistencia: any[];
}

function HistorialAsistenciasTable({ asistencias, tiposAsistencia }: HistorialAsistenciasTableProps) {
  if (!asistencias || asistencias.length === 0) return <Typography>No hay asistencias registradas.</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID Asistencia</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Inicio</TableCell>
            <TableCell>Fin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asistencias.map((asistencia) => (
            <TableRow key={asistencia.idAsistencia}>
              <TableCell>{asistencia.idAsistencia}</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HistorialAsistenciasTable;
