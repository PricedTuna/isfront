import { useState } from 'react'
import { GetSesionTrabajoDto } from '../../../dtos/sesionTrabajo/GetSesionTrabajoDto'
import { SesionTrabajoService } from '../../../services/SesionTrabajoService'

function useGetSesionesTrabajo() {
  const sesionTrabajoService = new SesionTrabajoService()
  const [sesionesTrabajo, setSesionesTrabajo] = useState<GetSesionTrabajoDto[] | null>(null)

  const fetchSesionesTrabajo = async (idUsuario: number) => {
    const sesionesTrabajo = await sesionTrabajoService.getSesionesTrabajo(idUsuario)
    setSesionesTrabajo(sesionesTrabajo)
    return sesionesTrabajo
  }

  return {sesionesTrabajo, fetchSesionesTrabajo}

}

export default useGetSesionesTrabajo
