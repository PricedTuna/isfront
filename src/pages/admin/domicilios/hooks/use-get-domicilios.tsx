import { useState, useCallback, useMemo } from "react";
import { GetDomicilioDto } from "../../../../dtos/domicilios/GetDomicilioDto";
import { DomicilioService } from "../../../../services/DomicilioService";
import { GetPaisDto } from "../../../../dtos/domicilios/GetPaisDto";
import { GetEstadoDto } from "../../../../dtos/domicilios/GetEstadoDto";
import { GetCiudadDto } from "../../../../dtos/domicilios/GetCiudad";
import { GetMunicipioDto } from "../../../../dtos/domicilios/GetMunicipioDto";

function useGetDomicilio() {
  const _domicilioService = useMemo(() => new DomicilioService(), []); // Memorizar la instancia del servicio

  const [domicilios, setDomicilios] = useState<GetDomicilioDto[] | undefined>(undefined);
  const [paises, setPaises] = useState<GetPaisDto[]>([]);
  const [estados, setEstados] = useState<GetEstadoDto[]>([]);
  const [municipios, setMunicipios] = useState<GetMunicipioDto[]>([]);
  const [ciudades, setCiudades] = useState<GetCiudadDto[]>([]);

  // Generar opciones para ComboBoxes
  const paisOptions = useMemo(
    () => paises.map((pais) => ({ id: pais.idPais, nombre: pais.nombre })),
    [paises]
  );

  const estadoOptions = useMemo(
    () => estados.map((estado) => ({ id: estado.idEstado, nombre: estado.nombre })),
    [estados]
  );

  const municipioOptions = useMemo(
    () => municipios.map((municipio) => ({ id: municipio.idMunicipio, nombre: municipio.nombre })),
    [municipios]
  );

  const ciudadOptions = useMemo(
    () => ciudades.map((ciudad) => ({ id: ciudad.idCiudad, nombre: ciudad.nombre })),
    [ciudades]
  );

  // Cargar todos los domicilios
  const fetchDomicilios = useCallback(async () => {
    try {
      const response = await _domicilioService.getAll();
      setDomicilios(Array.isArray(response) ? (response as GetDomicilioDto[]) : []);
    } catch (error) {
      console.error("Error fetching domicilios:", error);
      setDomicilios(undefined);
    }
  }, [_domicilioService]);

  // Cargar países
  const fetchPaises = useCallback(async () => {
    try {
      const response = await _domicilioService.getPaises();
      setPaises(Array.isArray(response) ? (response as GetPaisDto[]) : []);
    } catch (error) {
      console.error("Error fetching paises:", error);
      setPaises([]);
    }
  }, [_domicilioService]);

  // Cargar estados según el país seleccionado
  const fetchEstados = useCallback(
    async (idPais: number) => {
      try {
        const response = await _domicilioService.getEstados(idPais);
        setEstados(Array.isArray(response) ? (response as GetEstadoDto[]) : []);
      } catch (error) {
        console.error(`Error fetching estados for idPais ${idPais}:`, error);
        setEstados([]);
      }
    },
    [_domicilioService]
  );

  // Cargar municipios según el estado seleccionado
  const fetchMunicipios = useCallback(
    async (idEstado: number) => {
      try {
        const response = await _domicilioService.getMunicipios(idEstado);
        setMunicipios(Array.isArray(response) ? (response as GetMunicipioDto[]) : []);
      } catch (error) {
        console.error(`Error fetching municipios for idEstado ${idEstado}:`, error);
        setMunicipios([]);
      }
    },
    [_domicilioService]
  );

  // Cargar ciudades según el municipio seleccionado
  const fetchCiudades = useCallback(
    async (idMunicipio: number) => {
      try {
        const response = await _domicilioService.getCiudades(idMunicipio);
        setCiudades(Array.isArray(response) ? (response as GetCiudadDto[]) : []);
      } catch (error) {
        console.error(`Error fetching ciudades for idMunicipio ${idMunicipio}:`, error);
        setCiudades([]);
      }
    },
    [_domicilioService]
  );

  return {
    domicilios,
    paises,
    estados,
    municipios,
    ciudades,
    paisOptions,
    estadoOptions,
    municipioOptions,
    ciudadOptions,
    fetchDomicilios,
    fetchPaises,
    fetchEstados,
    fetchMunicipios,
    fetchCiudades,
  };
}

export default useGetDomicilio;
