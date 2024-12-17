import { useState } from 'react'
import { TipoPermisoDto } from '../../../dtos/permiso/TipoPermisoDto'
import { PermisoService } from '../../../services/PermisoService'

function useGetTiposPermiso() {
  const permisoService = new PermisoService()
  const [tiposPermiso, setTiposPermiso] = useState<TipoPermisoDto[] | null>(null)

  const fetchTiposPermiso = async () => {
    const result = await permisoService.getAllTiposPermiso()
    setTiposPermiso(result)
    return result
  }

  return {tiposPermiso, fetchTiposPermiso, setTiposPermiso}

}

export default useGetTiposPermiso
