import { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";

interface FieldConfig<T> {
  name: keyof T;
  label: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
  select?: boolean;
  options?: { value: string; label: string }[];
  fullWidth?: boolean;
  margin?: "normal" | "dense" | "none";
}

interface GenericFormProps<T> {
  title: string;
  fields: FieldConfig<T>[];
  onSubmit: (values: T) => Promise<void>; // Callback con los valores
  initialValues?: T; // Valores iniciales para edición
  showSuccessAlert?: (message: string) => Promise<void>; // Función para alerta de éxito
  showErrorAlert?: (message: string) => Promise<void>; // Función para alerta de error
  additionalComponents?: React.ReactNode;
}

export default function GenericForm<T>({
  title,
  fields,
  onSubmit,
  initialValues,
  showSuccessAlert,
  showErrorAlert,
  additionalComponents,
}: GenericFormProps<T>) {
  const [formValues, setFormValues] = useState<T>(
    initialValues || fields.reduce((acc, field) => {
      acc[field.name] = "" as T[keyof T];
      return acc;
    }, {} as T)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value } as T);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await onSubmit(formValues); // Llama al callback definido en props
      if (showSuccessAlert) {
        await showSuccessAlert(
          initialValues
            ? "Los cambios se guardaron correctamente."
            : "El registro fue exitoso."
        );
      }
    } catch (error) {
      if (showErrorAlert) {
        await showErrorAlert(
          "Hubo un problema al procesar la solicitud. Inténtalo de nuevo."
        );
      }
      console.error("Error en el formulario:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} width="100%">
          {fields.map((field, index) => (
            <TextField
              key={index}
              name={String(field.name)}
              label={field.label}
              type={field.type || "text"}
              required={field.required}
              fullWidth={field.fullWidth ?? true}
              margin={field.margin || "normal"}
              value={formValues[field.name] as string}
              onChange={handleChange}
              multiline={field.multiline}
              select={field.select}
              InputLabelProps={field.type === "date" ? { shrink: true } : undefined}
            />
          ))}
          {additionalComponents}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Guardar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
