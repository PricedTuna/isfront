import { CreateAsistenciaDto } from "../../../dtos/asistencia/CreateAsistenciaDto";
import { AsistenciasService } from "../../../services/AsistenciasService";

function useCreateAsistencia() {
  const asistenciasService = new AsistenciasService();

  const createAsistencia = async (createAsistencia: CreateAsistenciaDto) => {
    const asistencia = await asistenciasService.createAsistencia(
      createAsistencia
    );
    return asistencia;
  };

  return { createAsistencia };
}

export default useCreateAsistencia;
