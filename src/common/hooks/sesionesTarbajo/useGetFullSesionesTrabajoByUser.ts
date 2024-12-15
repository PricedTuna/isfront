import { useState } from 'react';
import { GetFullSesionTrabajoDto } from '../../../dtos/sesionTrabajo/GetFullSesionTrabajoDto';
import { SesionTrabajoService } from '../../../services/SesionTrabajoService';

function useGetFullSesionesTrabajoByUser() {
  const sesionTrabajoService = new SesionTrabajoService();
  const [fullSesionesTrabajo, setFullSesionesTrabajo] = useState<GetFullSesionTrabajoDto[] | null>(null)

  const fetchFullSesionesTrabajoByUser = async (idUsuario: number) => {
    const sesionesTrabajo = await sesionTrabajoService.getFullSesionesTrabajo(idUsuario);
    setFullSesionesTrabajo(sesionesTrabajo)
    return sesionesTrabajo
  }

  return {fullSesionesTrabajo, fetchFullSesionesTrabajoByUser}
}

export default useGetFullSesionesTrabajoByUser
