import { useState } from 'react'
import { GetSesionTrabajoDto } from '../../../dtos/sesionTrabajo/GetSesionTrabajoDto'
import { SesionTrabajoService } from '../../../services/SesionTrabajoService'

function getSesionTrabajoByToken() {
  const sesionTrabajoService = new SesionTrabajoService()

  const [sesionTrabajo, setSesionTrabajo] = useState<GetSesionTrabajoDto | null>(null)

  const fetchSesionTrabajoByToken = async (token:string) => {
    const sesionTrabajo = await sesionTrabajoService.getSesionTrabajoByToken(token)
    setSesionTrabajo(sesionTrabajo)
    return sesionTrabajo
  }

  return {fetchSesionTrabajoByToken, sesionTrabajo}

}

export default getSesionTrabajoByToken
