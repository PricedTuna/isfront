import { Box, Typography, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetUserContext } from "../../../common/context/AuthContext";
import useFinalizarSesionTrabajo from "../../../common/hooks/sesionesTarbajo/useFinalizarSesionTrabajo";
import useGetSesionesTrabajo from "../../../common/hooks/sesionesTarbajo/useGetSesionesTrabajo";
import SesionesTrabajoList from "../components/SesionesTrabajoList";

function SesionesTrabajoPage() {
  const user = useGetUserContext();
  const { fetchSesionesTrabajo, sesionesTrabajo } = useGetSesionesTrabajo();
  const { finalizarSesionTrabajo } = useFinalizarSesionTrabajo();

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    fetchSesionesTrabajo(user.idUsuario);
  }, [user]);

  const handleFinalizarSesion = async (sesionId: number) => {
    if (!user) return;

    await finalizarSesionTrabajo(sesionId);
    fetchSesionesTrabajo(user.idUsuario);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filtrar las sesiones por sesionToken
  const filteredSesiones = sesionesTrabajo?.filter((sesion) =>
    sesion.sesionToken.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        {/* Buscador */}
        <TextField
          style={{ maxWidth: "300px" }}
          label="Buscar por Token"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{ mb: 4 }}
        />

        <SesionesTrabajoList
          sesiones={filteredSesiones}
          onFinalizar={handleFinalizarSesion}
          userId={user.idUsuario}
        />
      </Box>
    </Box>
  );
}

export default SesionesTrabajoPage;
