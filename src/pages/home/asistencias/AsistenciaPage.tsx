import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useGetTipoAsistenciaName } from "../../../common/hooks/asistencia/getTiposAsistenciaName";
import useGetAsistenciaById from "../../../common/hooks/asistencia/useGetAsistenciaById";
import useGetTiposAsistencia from "../../../common/hooks/asistencia/useGetTiposAsistencia";
import useGetSesionTrabajoById from "../../../common/hooks/sesionesTarbajo/useGetSesionTrabajoById";

function AsistenciaPage() {
  const { id: idAsistencia } = useParams<{ id: string }>();
  const { asistencia, fetAsistenciaById } = useGetAsistenciaById();
  const { fetchSesionTrabajoById, sesionTrabajo } = useGetSesionTrabajoById();
  const { fetchTiposAsistencia, tiposAsistencia } = useGetTiposAsistencia();

  useEffect(() => {
    fetchTiposAsistencia();
    const fetchData = async () => {
      if (!idAsistencia) return;
      const asistenciaResponse = await fetAsistenciaById(+idAsistencia);
      if (!asistenciaResponse) return;
      fetchSesionTrabajoById(asistenciaResponse.idSesionTrabajo);
    };

    fetchData();
  }, [idAsistencia]);

  if (!asistencia || !sesionTrabajo) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>hola puto</Typography>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      sx={{ mt: 4 }}
    >
      <Box maxWidth={"800px"}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>
          Detalles de la asistencia
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Tipo asistencia
                </Typography>
                <Typography>
                  {useGetTipoAsistenciaName(
                    asistencia,
                    tiposAsistencia ?? null
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Asistencia Inicio
                </Typography>
                <Typography>
                  {new Date(asistencia.asistenciaInicio).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Fin de la ssitencia
                </Typography>
                <Typography>
                  {asistencia?.asistenciaFin
                    ? new Date(asistencia?.asistenciaFin).toLocaleString()
                    : "En progreso"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Token de la sesion de trabajo
                </Typography>
                <Typography>{sesionTrabajo?.sesionToken}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AsistenciaPage;
