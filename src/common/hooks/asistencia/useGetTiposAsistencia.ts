import { useState } from 'react';
import { GetTipoAsistenciaDto } from '../../../dtos/asistencia/GetTipoAsistenciaDto';
import { AsistenciasService } from '../../../services/AsistenciasService';

function useGetTiposAsistencia() {
  const asistenciasService = new AsistenciasService();
  const [tiposAsistencia, setTiposAsistencia] = useState<GetTipoAsistenciaDto[] | null>(null)

  const fetchTiposAsistencia = async () => {
    const tiposAsistencia = await asistenciasService.getTiposAsistencias();
    setTiposAsistencia(tiposAsistencia);
    return tiposAsistencia;
  };


  return {tiposAsistencia, fetchTiposAsistencia}

}

export default useGetTiposAsistencia
