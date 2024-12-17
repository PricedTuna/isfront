import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

function SesionTrabajoModal({ open, onClose, sesionTrabajo }: any) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
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
          {!sesionTrabajo ? (
            <></>
          ) : (
            <>
              <Typography id="transition-modal-description">
                {`Sesion de trabajo: ${sesionTrabajo.idSesionTrabajo}`}
              </Typography>
              <QRCodeCanvas value={sesionTrabajo.sesionToken} size={200} />
              <Typography
                id="transition-modal-title"
                variant="h4"
                component="h2"
                textAlign={"center"}
                my={3}
              >
                {`${sesionTrabajo.sesionToken}`}
              </Typography>
              <Typography id="transition-modal-description">
                {`Sesion started: ${sesionTrabajo.createDate}`}
              </Typography>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
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

export default SesionTrabajoModal;
