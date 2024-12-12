import { SesionTrabajoService } from '../../../services/SesionTrabajoService'

function useFinalizarSesionTrabajo() {
  const sesionTrabajoService = new SesionTrabajoService()

  const finalizarSesionTrabajo = (id: number) => {
    sesionTrabajoService.finalizarSesionTrabajo(id)
  }

  return {finalizarSesionTrabajo}
}

export default useFinalizarSesionTrabajo
