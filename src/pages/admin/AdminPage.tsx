import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserContext } from "../../common/context/AuthContext";
import useGetSesionesTrabajo from "../../common/hooks/sesionesTarbajo/useGetSesionesTrabajo";
import useFinalizarSesionTrabajo from "../../common/hooks/sesionesTarbajo/useFinalizarSesionTrabajo";
import useCreateSesionTrabajo from "../../common/hooks/sesionesTarbajo/useCreateSesionTrabajo";
import useGenerateSesionTrabajoToken from "../../common/hooks/sesionesTarbajo/useGenerateSesionTrabajoToken";
import { GetSesionTrabajoDto } from "../../dtos/sesionTrabajo/GetSesionTrabajoDto";

function AdminPage() {
  const [open, setOpen] = useState(false); // Estado para controlar el modal
  const [sesionTrabajo, setSesionTrabajo] =
    useState<GetSesionTrabajoDto | null>();
  const user = useGetUserContext();
  const { fetchSesionesTrabajo, sesionesTrabajo } = useGetSesionesTrabajo();
  const { finalizarSesionTrabajo } = useFinalizarSesionTrabajo();
  const { createSesionTrabajo } = useCreateSesionTrabajo();

  useEffect(() => {
    if (!user) return;

    fetchSesionesTrabajo(user.idUsuario);
  }, [user]);

  const handleFinalizarSesion = async (
    sesionTrabajoId: number,
    idUsuario: number
  ) => {
    await finalizarSesionTrabajo(sesionTrabajoId); // Llamar a la función con el id
    fetchSesionesTrabajo(idUsuario);
  };

  const handleIniciarSesionTrabajo = async (idUsuario: number) => {
    const sesionToken = useGenerateSesionTrabajoToken();
    const sesionTrabajo = await createSesionTrabajo({ idUsuario, sesionToken });
    setSesionTrabajo(sesionTrabajo);
    handleOpen()
    fetchSesionesTrabajo(idUsuario)
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return !user ? (
    <></>
  ) : (
    <Box>
      <Typography
        variant="h3"
        textAlign="center"
        fontFamily={"Oswald"}
        fontSize={50}
      >
        Bienvenido
      </Typography>
      <Box display="flex" justifyContent="center" gap={3} mt={4} mb={5}>
        <Box>
          <Button
            variant="outlined"
            onClick={() => handleIniciarSesionTrabajo(user.idUsuario)}
          >
            iniciar una sesion de trabajo
          </Button>
        </Box>
      </Box>
      <Box mt={4} maxWidth="600px" margin="0 auto">
        <Typography variant="h5" gutterBottom textAlign={"center"}>
          Sesiones de Trabajo
        </Typography>
        {sesionesTrabajo &&
          sesionesTrabajo.length > 0 &&
          sesionesTrabajo.map((sesion) => (
            <Box
              key={sesion.idSesionTrabajo}
              p={2}
              mb={2}
              border="1px solid #ccc"
              borderRadius="4px"
            >
              <Typography variant="body1">
                <strong>Token:</strong> {sesion.sesionToken}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha de Creación:</strong>{" "}
                {new Date(sesion.createDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Fecha de Finalización:</strong>{" "}
                {sesion.finalizedDate
                  ? new Date(sesion.finalizedDate).toLocaleDateString()
                  : "En curso"}
              </Typography>
              <Box
                mt={2}
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
                <Button
                  component={Link}
                  to={`/admin/sesionTrabajo/${sesion.idSesionTrabajo}`}
                  variant="contained"
                  color="primary"
                >
                  Ver Detalles
                </Button>
                {!sesion.finalizedDate && (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      handleFinalizarSesion(
                        sesion.idSesionTrabajo,
                        user.idUsuario
                      )
                    }
                  >
                    Finalizar Sesión
                  </Button>
                )}
              </Box>
            </Box>
          ))}
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
          <Box sx={style} textAlign={'center'}>
            {!sesionTrabajo ? (
              <></>
            ) : (
              <>
              <Typography
                  id="transition-modal-description"
                >
                  {`Sesion de trabajo: ${sesionTrabajo.idSesionTrabajo}`}
                </Typography>
                <Typography
                  id="transition-modal-title"
                  variant="h4"
                  component="h2"
                  textAlign={'center'}
                  my={3}
                >
                  {`${sesionTrabajo.sesionToken}`}
                </Typography>
                <Typography
                  id="transition-modal-description"
                >
                  {`Sesion started: ${sesionTrabajo.createDate}`}
                </Typography>
              </>
            )}
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

export default AdminPage;
