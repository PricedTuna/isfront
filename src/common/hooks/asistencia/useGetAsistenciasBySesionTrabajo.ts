import { useState } from 'react';
import { GetAsistenciaDto } from '../../../dtos/asistencia/GetAsistenciaDto';
import { AsistenciasService } from '../../../services/AsistenciasService';

function useGetAsistenciasBySesionTrabajo() {
  const asistenciasService = new AsistenciasService();
  const [asistencias, setAsistencias] = useState<GetAsistenciaDto[] | null>(null)

  const fetchAsistenciasBySesionTrabajo = async (id: number) => {
    const asistencias = await asistenciasService.getAsistenciasBySesionTrabajo(id)
    setAsistencias(asistencias)
    return asistencias
  }

  return {asistencias, fetchAsistenciasBySesionTrabajo}
}

export default useGetAsistenciasBySesionTrabajo
