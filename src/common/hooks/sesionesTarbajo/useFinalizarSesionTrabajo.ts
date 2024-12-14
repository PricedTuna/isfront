import { SesionTrabajoService } from '../../../services/SesionTrabajoService'

function useFinalizarSesionTrabajo() {
  const sesionTrabajoService = new SesionTrabajoService()

  const finalizarSesionTrabajo = async (id: number) => {
    await sesionTrabajoService.finalizarSesionTrabajo(id)
  }

  return {finalizarSesionTrabajo}
}

export default useFinalizarSesionTrabajo
