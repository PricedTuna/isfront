import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useGetUserContext } from "../../../common/context/AuthContext";
import useFinalizarSesionTrabajo from "../../../common/hooks/sesionesTarbajo/useFinalizarSesionTrabajo";
import useGetSesionesTrabajo from "../../../common/hooks/sesionesTarbajo/useGetSesionesTrabajo";
import SesionesTrabajoList from "../components/SesionesTrabajoList";

function SesionesTrabajoPage() {
  const user = useGetUserContext();
  const { fetchSesionesTrabajo, sesionesTrabajo } = useGetSesionesTrabajo();
  const { finalizarSesionTrabajo } = useFinalizarSesionTrabajo();

  useEffect(() => {
    if (!user) return;
    fetchSesionesTrabajo(user.idUsuario);
  }, [user]);

  const handleFinalizarSesion = async (sesionId: number) => {
    if (!user) return;

    await finalizarSesionTrabajo(sesionId);
    fetchSesionesTrabajo(user.idUsuario);
  };

  return !user ? (
    <></>
  ) : (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        my={6}
      >
        <Typography
          textAlign="center"
          py={2}
          variant="h2"
          fontFamily={"Oswald"}
          mb={4}
        >
          Sesiónes De Trabajo
        </Typography>
        <SesionesTrabajoList
          sesiones={sesionesTrabajo}
          onFinalizar={handleFinalizarSesion}
          userId={user.idUsuario}
        />
      </Box>
    </Box>
  );
}

export default SesionesTrabajoPage;
