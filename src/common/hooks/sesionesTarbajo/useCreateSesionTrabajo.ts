import { SesionTrabajoService } from "../../../services/SesionTrabajoService";
import { CreateSesionTrabajoDto } from "../../../dtos/sesionTrabajo/CreateSesionTrabajoDto";

function useCreateSesionTrabajo() {
  const sesionTrabajoService = new SesionTrabajoService();

  const createSesionTrabajo = async (
    createSesionTrabajoDto: CreateSesionTrabajoDto
  ) => {
    return await sesionTrabajoService.createSesionTrabajo(createSesionTrabajoDto);
  };

  return { createSesionTrabajo };
}

export default useCreateSesionTrabajo;
