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
import { TipoPermisoDto } from "../../../dtos/permiso/TipoPermisoDto";

interface PermisoModalProps {
  isOpen: boolean;
  onClose: () => void;
  tiposPermiso: TipoPermisoDto[];
  onSolicitarPermiso: (
    idTipoPermiso: number,
    descripcion: string,
    token: string
  ) => void;
}

const PermisoModal: React.FC<PermisoModalProps> = ({
  isOpen,
  onClose,
  tiposPermiso,
  onSolicitarPermiso,
}) => {
  const [selectedTipoPermiso, setSelectedTipoPermiso] = useState<number | "">(
    ""
  );
  const inputRef = useRef<string>("");
  const descriptionRef = useRef<string>("");

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setSelectedTipoPermiso(Number(event.target.value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current = event.target.value;
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    descriptionRef.current = event.target.value;
  };

  const handleSolicitar = () => {
    if (selectedTipoPermiso && descriptionRef.current && inputRef.current) {
      onSolicitarPermiso(
        selectedTipoPermiso,
        descriptionRef.current,
        inputRef.current
      );
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
            Solicitar permiso
          </Typography>
          <TextField
            fullWidth
            label="Token de sesión"
            variant="outlined"
            margin="normal"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Descripción"
            variant="outlined"
            margin="normal"
            onChange={handleDescriptionChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de permiso</InputLabel>
            <Select
              value={selectedTipoPermiso}
              onChange={handleSelectChange}
              label="Tipo de permiso"
            >
              {tiposPermiso.map((tipo) => (
                <MenuItem key={tipo.idTipoPermiso} value={tipo.idTipoPermiso}>
                  {tipo.nombrePermiso}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSolicitar}>
              Solicitar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PermisoModal;
