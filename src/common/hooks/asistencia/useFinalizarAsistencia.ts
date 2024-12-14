import { FinalizarAsistenciaDto } from "../../../dtos/asistencia/FinalizarAsistenciaDto";
import { AsistenciasService } from "../../../services/AsistenciasService";

function useFinalizarAsistencia() {
  const asistenciasService = new AsistenciasService();

  const finalizarAsistencia = async (idAsistencia: number,  finalizarAsistenciaDto:  FinalizarAsistenciaDto) => {
    const asistenciaFinalizada = await asistenciasService.finalizarAsistencia(idAsistencia,  finalizarAsistenciaDto);
    return asistenciaFinalizada;
  };

  return { finalizarAsistencia };
}

export default useFinalizarAsistencia;
