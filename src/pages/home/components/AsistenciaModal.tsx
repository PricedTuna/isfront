import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { GetTipoAsistenciaDto } from "../../../dtos/asistencia/GetTipoAsistenciaDto";

interface AsistenciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  tiposAsistencia: GetTipoAsistenciaDto[];
  onAccederSesionTrabajo: (idTipoAsistencia: number, token: string) => void;
}

const AsistenciaModal: React.FC<AsistenciaModalProps> = ({
  isOpen,
  onClose,
  tiposAsistencia,
  onAccederSesionTrabajo,
}) => {
  const [selectedTipoAsistencia, setSelectedTipoAsistencia] = useState<
    number | ""
  >("");
  const inputRef = useRef<string>("");

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setSelectedTipoAsistencia(Number(event.target.value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current = event.target.value;
  };

  const handleAcceder = () => {
    if (selectedTipoAsistencia && inputRef.current) {
      onAccederSesionTrabajo(selectedTipoAsistencia, inputRef.current);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Acceder a sesión de trabajo
          </Typography>
          <TextField
            fullWidth
            label="Token de sesión"
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de asistencia</InputLabel>
            <Select
              value={selectedTipoAsistencia}
              onChange={handleSelectChange}
              label="Tipo de asistencia"
            >
              {tiposAsistencia.map((tipo) => (
                <MenuItem key={tipo.idTipoAsistencia} value={tipo.idTipoAsistencia}>
                  {tipo.nombreAsistencia}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleAcceder}>
              Acceder
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AsistenciaModal;
