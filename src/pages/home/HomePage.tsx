import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useGetUserContext } from "../../common/context/AuthContext";
import useGetAsistencias from "../../common/hooks/asistencia/useGetAsistencias";
import getSesionTrabajoByToken from "../../common/hooks/sesionesTarbajo/getSesionTrabajoByToken";
import useGetEmpleado from "../../common/hooks/useGetEmpleado";
import useCreateAsistencia from "../../common/hooks/asistencia/useCreateAsistencia";

function HomePage() {
  const user = useGetUserContext();
  const { fetchEmpleado, empleado } = useGetEmpleado();
  const { asistencias, fetchAsistencias } = useGetAsistencias();
  const { createAsistencia } = useCreateAsistencia()
  const { fetchSesionTrabajoByToken } = getSesionTrabajoByToken();
  const inputRef = useRef<string>("");

  const [open, setOpen] = useState(false); // Estado para controlar el modal

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!user) return;

    fetchEmpleado(user.idEmpleado ?? 1);
    fetchAsistencias(user.idUsuario);
  }, [user]);

  const handleAccederSesionTrabajo = () => {
    console.log("acceder"); // !
    const sesionTrabajo = fetchSesionTrabajoByToken(inputRef.current);
    if (!sesionTrabajo)
      // TODO HANDLE CON SWAL
      return;

    // const asistencia = createAsistencia({asistenciaInicio: new Date()})
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current = event.target.value; // Actualizar el valor del ref
  };

  return (
    <Box p={2}>
      <Typography textAlign="center" py={2} variant="h2" fontFamily={"Oswald"}>
        {`Hola ${empleado?.nombreEmpleado}`}
      </Typography>
      <Box>
        <Typography textAlign="center" py={2} variant="h4" fontFamily={"Rubik"}>
          total de asistencias: {asistencias?.length}
        </Typography>

        <Button variant="contained" onClick={handleOpen}>
          Acceder a sesion de trabajo
        </Button>
      </Box>

      {/* Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} textAlign={"center"}>
            <TextField
              value={inputRef.current} // Vinculamos el valor del input al useRef
              onChange={handleChange} // Actualizamos el ref en cada cambio
              label="Token"
              variant="outlined"
              inputProps={{
                maxLength: 12,
              }}
            />
            <Button
              variant="contained"
              onClick={handleAccederSesionTrabajo}
              sx={{ marginTop: 2 }}
            >
              Acceder
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default HomePage;
