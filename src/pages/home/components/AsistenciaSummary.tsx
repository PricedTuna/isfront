import { Box, Typography } from "@mui/material";
import { GetAsistenciaDto } from "../../../dtos/asistencia/GetAsistenciaDto";
import { calcularHorasSemana, calcularHorasTrabajadas } from "../../../utils/Asistencias";

interface AsistenciaSummaryProps {
  asistencias: GetAsistenciaDto[] | null;
}

function AsistenciaSummary({ asistencias }: AsistenciaSummaryProps) {
  return (
    <Box textAlign="center">
      <Typography py={1} variant="h5" fontFamily={"Rubik"}>
        Total de asistencias: {asistencias ? asistencias.length : 0}
      </Typography>
      <Typography py={1} variant="h5" fontFamily={"Rubik"}>
        Total de horas trabajadas: {asistencias ? calcularHorasTrabajadas(asistencias) : 0}
      </Typography>
      <Typography py={1} variant="h5" fontFamily={"Rubik"}>
        Horas trabajadas esta semana: {asistencias ? calcularHorasSemana(asistencias) : 0}
      </Typography>
    </Box>
  );
}

export default AsistenciaSummary;
