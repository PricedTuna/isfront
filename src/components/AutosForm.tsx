import { useState, useEffect } from "react";
import GenericForm from "./Form";
import { AutoService } from "../services/AutoService";
import { showSuccessAlert, showErrorAlert } from "../utils/AlertUtils";
import { useMediaQuery } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Auto } from "../dtos/autos/AutoDto"; // DTO del auto
interface AutoFormValues {
  nombreModelo: string;
  yearModelo: string;
  ordenRegistro: string;
  fechaCompra: string;
  numeroPlacas: string;
  numeroSerie: string;
  numeroPoliza: string;
  vencimientoPoliza: string;
}

export default function AutosForm() {
  const autoService = new AutoService();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const navigate = useNavigate();
  const location = useLocation();
  const [formValues, setFormValues] = useState<AutoFormValues>({
    nombreModelo: "",
    yearModelo: "",
    ordenRegistro: "",
    fechaCompra: "",
    numeroPlacas: "",
    numeroSerie: "",
    numeroPoliza: "",
    vencimientoPoliza: "",
  });

  const [loading, setLoading] = useState(true); 

  const initialValues = location.state as Auto | null;

  useEffect(() => {

    if (initialValues) {
      setFormValues({
        nombreModelo: initialValues.nombreModelo,
        yearModelo: initialValues.yearModelo,
        ordenRegistro: initialValues.ordenRegistro,
        fechaCompra: initialValues.fechaCompra,
        numeroPlacas: initialValues.numeroPlacas,
        numeroSerie: initialValues.numeroSerie,
        numeroPoliza: initialValues.numeroPoliza,
        vencimientoPoliza: initialValues.vencimientoPoliza,
      });
      setLoading(false);
    } else {
      // Si estamos creando un auto, no es necesario cargar datos
      setLoading(false);
    }
  }, [initialValues]);

  const handleSubmit = async (values: AutoFormValues) => {
    try {
      if (initialValues) {
        // Si hay initialValues, actualizamos el auto
        await autoService.update(initialValues.idAuto, values);
        await showSuccessAlert("El auto fue actualizado correctamente.", prefersDarkMode);
      } else {
        // Si no existe, creamos un nuevo auto
        await autoService.create(values);
        await showSuccessAlert("El auto fue registrado correctamente.", prefersDarkMode);
      }
      navigate("/admin/autos");
    } catch (error) {
      await showErrorAlert("Hubo un problema al procesar la solicitud. Inténtalo de nuevo.", prefersDarkMode);
      console.error("Error en el registro/actualización de auto:", error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>; // Mostrar cargando mientras los datos se obtienen
  }

  return (
    <GenericForm<AutoFormValues>
      title={initialValues ? "Editar Auto" : "Registrar Auto"}
      fields={[
        { name: "nombreModelo", label: "Nombre Modelo", required: true },
        { name: "yearModelo", label: "Año Modelo", type: "number", required: true },
        { name: "ordenRegistro", label: "Orden Registro", required: true },
        { name: "fechaCompra", label: "Fecha de Compra", type: "date", required: true },
        { name: "numeroPlacas", label: "Número de Placas", required: true },
        { name: "numeroSerie", label: "Número de Serie", required: true },
        { name: "numeroPoliza", label: "Número de Póliza", required: true },
        { name: "vencimientoPoliza", label: "Vencimiento Póliza", type: "date", required: true },
      ]}
      initialValues={formValues} // Pasar los valores obtenidos al formulario
      onSubmit={handleSubmit}
    />
  );
}
