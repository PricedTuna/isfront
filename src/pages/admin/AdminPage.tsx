import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { useGetUserContext } from "../../common/context/AuthContext";
import useCreateSesionTrabajo from "../../common/hooks/sesionesTarbajo/useCreateSesionTrabajo";
import useFinalizarSesionTrabajo from "../../common/hooks/sesionesTarbajo/useFinalizarSesionTrabajo";
import useGenerateSesionTrabajoToken from "../../common/hooks/sesionesTarbajo/useGenerateSesionTrabajoToken";
import useGetFullSesionesTrabajoByUser from "../../common/hooks/sesionesTarbajo/useGetFullSesionesTrabajoByUser";
import useGetSesionesTrabajo from "../../common/hooks/sesionesTarbajo/useGetSesionesTrabajo";
import { GetFullSesionTrabajoDto } from "../../dtos/sesionTrabajo/GetFullSesionTrabajoDto";
import { GetSesionTrabajoDto } from "../../dtos/sesionTrabajo/GetSesionTrabajoDto";
import useGetEmpleado from "../../common/hooks/useGetEmpleado";

function AdminPage() {
  const [open, setOpen] = useState(false);
  const [sesionTrabajo, setSesionTrabajo] =
    useState<GetSesionTrabajoDto | null>();
  const user = useGetUserContext();
  const { fetchSesionesTrabajo, sesionesTrabajo } = useGetSesionesTrabajo();
  const { finalizarSesionTrabajo } = useFinalizarSesionTrabajo();
  const { createSesionTrabajo } = useCreateSesionTrabajo();
  const { fetchFullSesionesTrabajoByUser } = useGetFullSesionesTrabajoByUser();
  const { fetchEmpleado } = useGetEmpleado();

  useEffect(() => {
    if (!user) return;

    fetchSesionesTrabajo(user.idUsuario);
  }, [user]);

  const handleFinalizarSesion = async (
    sesionTrabajoId: number,
    idUsuario: number
  ) => {
    await finalizarSesionTrabajo(sesionTrabajoId);
    fetchSesionesTrabajo(idUsuario);
  };

  const handleIniciarSesionTrabajo = async (idUsuario: number) => {
    const sesionToken = useGenerateSesionTrabajoToken();
    const sesionTrabajo = await createSesionTrabajo({ idUsuario, sesionToken });
    setSesionTrabajo(sesionTrabajo);
    handleOpen();
    fetchSesionesTrabajo(idUsuario);
  };

  const handleExportSesionesTrabajo = async (idUsuario: number) => {
    const sesiones = await getFullSesionesTrabajo(idUsuario);

    // Estructurar los datos para el Excel
    const formattedData: any[] = [];

    for (const sesion of sesiones) {
      // Agregar encabezado para la sesión de trabajo
      formattedData.push({
        idSesionTrabajo: sesion.idSesionTrabajo,
        sesionToken: sesion.sesionToken,
        createDate: new Date(sesion.createDate).toISOString(),
        finalizedDate: sesion.finalizedDate
          ? new Date(sesion.finalizedDate).toISOString()
          : "No finalizado",
        idUsuario: sesion.idUsuario,
        // Celdas vacías para mantener el formato visual
        asistenciaId: "",
        nombreEmpleado: "",
        idTipoAsistencia: "",
        asistenciaInicio: "",
        asistenciaFin: "",
        asistenciaCreateDate: "",
        asistenciaUpdateDate: "",
      });

      // Procesar todas las asistencias de la sesión
      for (const asistencia of sesion.asistencias) {
        const empleado = await fetchEmpleado(asistencia.idEmpleado); // Obtener el empleado
        if (!empleado) formattedData.push({});
        else
          formattedData.push({
            idSesionTrabajo: "",
            sesionToken: "",
            createDate: "",
            finalizedDate: "",
            idUsuario: "",
            asistenciaId: asistencia.idAsistencia,
            nombreEmpleado: empleado.nombreEmpleado, // Reemplazar idEmpleado por nombreEmpleado
            idTipoAsistencia: asistencia.idTipoAsistencia,
            asistenciaInicio: new Date(
              asistencia.asistenciaInicio
            ).toISOString(),
            asistenciaFin: asistencia.asistenciaFin
              ? new Date(asistencia.asistenciaFin).toISOString()
              : "Sin finalizar",
            asistenciaCreateDate: new Date(asistencia.createDate).toISOString(),
            asistenciaUpdateDate: new Date(asistencia.updateDate).toISOString(),
          });
      }

      // Agregar una fila vacía entre sesiones para mejorar legibilidad
      formattedData.push({});
    }

    // Exportar a Excel
    exportToExcel(formattedData, "SesionesTrabajo");
  };

  const exportToExcel = (data: any[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const getFullSesionesTrabajo = async (
    idUsuario: number
  ): Promise<GetFullSesionTrabajoDto[]> => {
    const sesiones = await fetchFullSesionesTrabajoByUser(idUsuario);
    return sesiones ?? [];
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
        <Box display="flex" flexDirection={"column"} gap={1}>
          <Button
            variant="outlined"
            onClick={() => handleIniciarSesionTrabajo(user.idUsuario)}
          >
            iniciar una sesion de trabajo
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleExportSesionesTrabajo(user.idUsuario)}
          >
            Exportar sesiones a Excel
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
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
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
                gap={2}
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
