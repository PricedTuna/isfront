import GenericList from "./List";
import { Nacionalidad } from "../dtos/nacionalidad/NacionalidadDto";
import { NacionalidadService } from "../services/NacionalidadService";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useGetNationalities from "../pages/catalogs/hooks/use-get-nacionalidad";

const NacionalidadList = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const _nacionalidadService = new NacionalidadService();

  const { nationalities, fetchNationalities } = useGetNationalities();

  useEffect(() => {
    fetchNationalities();
  }, [fetchNationalities]);

  const handleEdit = (nationalities: Nacionalidad) => {
    navigate("/admin/nacionalidades", { state: nationalities }); // Navega a la página de creación y pasa la nacionalidad como estado
  };

  const handleDelete = async (id: number) => {
    await _nacionalidadService.delete(id);
    fetchNationalities();
  };

  return (
    <GenericList<Nacionalidad>
      title="Listado de Nacionalidades"
      items={nationalities || []} // Proporciona un arreglo vacío si `nationalities` es `undefined`
      onEdit={handleEdit}
      onDelete={handleDelete}
      filterKeys={["nacionalidad"]}
      getItemId={(nac) => nac.idNacionalidad}
      getItemLabel={(nac) => nac.nacionalidad}
    />
  );
};

export default NacionalidadList;
