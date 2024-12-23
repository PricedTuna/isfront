import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetUserContext } from "../../common/context/AuthContext";
import useCreateSesionTrabajo from "../../common/hooks/sesionesTarbajo/useCreateSesionTrabajo";
import useFinalizarSesionTrabajo from "../../common/hooks/sesionesTarbajo/useFinalizarSesionTrabajo";
import useGenerateSesionTrabajoToken from "../../common/hooks/sesionesTarbajo/useGenerateSesionTrabajoToken";
import useGetSesionesTrabajo from "../../common/hooks/sesionesTarbajo/useGetSesionesTrabajo";
import { GetSesionTrabajoDto } from "../../dtos/sesionTrabajo/GetSesionTrabajoDto";
import { exportToExcel } from "../../utils/Reports";
import AdminPageActions from "./components/AdminPageActions";
import SesionesTrabajoList from "./components/SesionesTrabajoList";
import SesionTrabajoModal from "./components/SesionTrabajoModal";

function AdminPage() {
  const [open, setOpen] = useState(false);
  const [sesionTrabajo, setSesionTrabajo] =
    useState<GetSesionTrabajoDto | null>(null);
  const user = useGetUserContext();
  const { fetchSesionesTrabajo, sesionesTrabajo } = useGetSesionesTrabajo();
  const { finalizarSesionTrabajo } = useFinalizarSesionTrabajo();
  const { createSesionTrabajo } = useCreateSesionTrabajo();

  useEffect(() => {
    if (!user) return;
    fetchSesionesTrabajo(user.idUsuario);
  }, [user]);

  const handleFinalizarSesion = async (sesionId: number) => {
    if (!user) return;

    await finalizarSesionTrabajo(sesionId);
    fetchSesionesTrabajo(user.idUsuario);
  };

  const handleIniciarSesionTrabajo = async () => {
    if (!user) return;
    const sesionToken = useGenerateSesionTrabajoToken();
    const sesion = await createSesionTrabajo({
      idUsuario: user.idUsuario,
      sesionToken,
    });
    setSesionTrabajo(sesion);
    setOpen(true);
    fetchSesionesTrabajo(user.idUsuario);
  };

  const handleExportSesionesTrabajo = () => {
    exportToExcel(sesionesTrabajo ?? [], "SesionesTrabajo");
  };

  return !user ? (
    <></>
  ) : (
    <Box>
      <Typography
        variant="h3"
        textAlign="center"
        fontFamily="Oswald"
        fontSize={50}
      >
        Bienvenido
      </Typography>
      <AdminPageActions
        onIniciarSesion={handleIniciarSesionTrabajo}
        onExportarSesion={handleExportSesionesTrabajo}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        my={6}
      >
        <Typography variant="h5" gutterBottom textAlign={"center"}>
          Ultima sesion de trabajo
        </Typography>
        <SesionesTrabajoList
          sesiones={sesionesTrabajo ? [sesionesTrabajo[0]] : null}
          onFinalizar={handleFinalizarSesion}
          userId={user.idUsuario}
        />
      </Box>
      <SesionTrabajoModal
        open={open}
        onClose={() => setOpen(false)}
        sesionTrabajo={sesionTrabajo}
      />
    </Box>
  );
}

export default AdminPage;
