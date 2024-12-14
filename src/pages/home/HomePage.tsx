import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useGetUserContext } from "../../common/context/AuthContext";
import { useGetTipoAsistenciaName } from "../../common/hooks/asistencia/getTiposAsistenciaName";
import useCreateAsistencia from "../../common/hooks/asistencia/useCreateAsistencia";
import useFinalizarAsistencia from "../../common/hooks/asistencia/useFinalizarAsistencia";
import useGetAsistencias from "../../common/hooks/asistencia/useGetAsistencias";
import useGetTiposAsistencia from "../../common/hooks/asistencia/useGetTiposAsistencia";
import getSesionTrabajoByToken from "../../common/hooks/sesionesTarbajo/getSesionTrabajoByToken";
import useGetEmpleado from "../../common/hooks/useGetEmpleado";
import { GetAsistenciaDto } from "../../dtos/asistencia/GetAsistenciaDto";
import GraficaHorasPorTipo from "./components/GraficaHorasPorTipo";

function HomePage() {
  const user = useGetUserContext();
  const { fetchEmpleado, empleado } = useGetEmpleado();
  const { asistencias, fetchAsistencias, setAsistencias } = useGetAsistencias();
  const { createAsistencia } = useCreateAsistencia();
  const { fetchTiposAsistencia, tiposAsistencia } = useGetTiposAsistencia();
  const { finalizarAsistencia } = useFinalizarAsistencia();
  const [selectedTipoAsistencia, setSelectedTipoAsistencia] = useState<
    number | ""
  >("");
  const { fetchSesionTrabajoByToken } = getSesionTrabajoByToken();
  const inputRef = useRef<string>("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFinalizar = async (idAsistencia: number) => {
    if (!asistencias) return;

    const asistenciaFinalizada = await finalizarAsistencia(idAsistencia, {
      asistenciaFin: new Date(),
    });

    const asistenciasActualizadas = asistencias.map((asistencia) =>
      asistencia.idAsistencia === idAsistencia
        ? asistenciaFinalizada
        : asistencia
    );
    const asistenciasFiltradas = asistenciasActualizadas.filter(
      (asistencia) => asistencia !== null
    );

    setAsistencias(asistenciasFiltradas);
  };

  useEffect(() => {
    if (!user || !user.idEmpleado) return;

    fetchEmpleado(user.idEmpleado);
    fetchAsistencias(user.idEmpleado);
    fetchTiposAsistencia();
  }, [user]);

  const handleAccederSesionTrabajo = async (
    idEmpleado: number | null,
    idTipoAsistencia: number
  ) => {
    if (!idEmpleado) return;

    const sesionTrabajo = await fetchSesionTrabajoByToken(inputRef.current);
    if (!sesionTrabajo) return;

    await createAsistencia({
      idEmpleado,
      asistenciaInicio: new Date(),
      idTipoAsistencia,
      idSesionTrabajo: sesionTrabajo.idSesionTrabajo,
    });

    fetchAsistencias(idEmpleado);
    handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current = event.target.value;
  };

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setSelectedTipoAsistencia(Number(event.target.value));
  };

  function calcularHorasTrabajadas(asistencias: GetAsistenciaDto[]): string {
    return asistencias
      .reduce((totalHoras, asistencia) => {
        if (asistencia.asistenciaFin && asistencia.asistenciaInicio) {
          const inicio = new Date(asistencia.asistenciaInicio).getTime();
          const fin = new Date(asistencia.asistenciaFin).getTime();
          const horas = (fin - inicio) / (1000 * 60 * 60); // Convertir milisegundos a horas
          return totalHoras + horas;
        }
        return totalHoras;
      }, 0)
      .toFixed(2); // Limitar a dos decimales
  }

  function obtenerRangoSemanaActual(): { inicio: Date; fin: Date } {
    const hoy = new Date();
    const diaDeLaSemana = hoy.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
    const lunes = new Date(hoy);
    lunes.setDate(
      hoy.getDate() - (diaDeLaSemana === 0 ? 6 : diaDeLaSemana - 1)
    ); // Retrocede al lunes
    lunes.setHours(0, 0, 0, 0); // Inicio del día lunes

    const domingo = new Date(lunes);
    domingo.setDate(lunes.getDate() + 6); // Avanza al domingo
    domingo.setHours(23, 59, 59, 999); // Fin del día domingo

    return { inicio: lunes, fin: domingo };
  }

  function calcularHorasSemana(asistencias: GetAsistenciaDto[]): string {
    const { inicio, fin } = obtenerRangoSemanaActual();

    return asistencias
      .filter((asistencia) => {
        const diaAsistencia = new Date(asistencia.asistenciaInicio).getTime();
        return (
          diaAsistencia >= inicio.getTime() && diaAsistencia <= fin.getTime()
        );
      })
      .reduce((totalHoras, asistencia) => {
        if (asistencia.asistenciaFin && asistencia.asistenciaInicio) {
          const inicio = new Date(asistencia.asistenciaInicio).getTime();
          const fin = new Date(asistencia.asistenciaFin).getTime();
          const horas = (fin - inicio) / (1000 * 60 * 60); // Convertir a horas
          return totalHoras + horas;
        }
        return totalHoras;
      }, 0)
      .toFixed(2); // Limitar a dos decimales
  }

  return !user ? (
    <></>
  ) : (
    <Box p={2}>
      <Typography textAlign="center" py={2} variant="h2" fontFamily={"Oswald"}>
        {`Hola ${empleado?.nombreEmpleado}`}
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography textAlign="center" py={2} variant="h4" fontFamily={"Rubik"}>
          Total de asistencias: {asistencias ? asistencias.length : 0}
        </Typography>
        <Typography textAlign="center" py={2} variant="h4" fontFamily={"Rubik"}>
          Total de horas trabajadas:{" "}
          {asistencias ? calcularHorasTrabajadas(asistencias) : 0}
        </Typography>
        <Typography textAlign="center" py={2} variant="h4" fontFamily={"Rubik"}>
          Horas trabajadas esta semana:{" "}
          {asistencias ? calcularHorasSemana(asistencias) : 0}
        </Typography>
        <Box>
          <GraficaHorasPorTipo asistencias={asistencias??[]} />
        </Box>
        <Button variant="contained" onClick={handleOpen}>
          Acceder a sesión de trabajo
        </Button>
      </Box>

      {/* Tabla de Asistencias */}
      <Box mt={4}>
        <Typography variant="h6" mb={2} textAlign="center">
          Historial de Asistencias
        </Typography>
        {asistencias && asistencias.length > 0 ? (
          <Box
            sx={{
              maxWidth: "800px", // Ancho máximo de la tabla
              margin: "0 auto", // Centramos horizontalmente
              borderRadius: "8px", // Opcional: bordes redondeados
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Sombra para darle un toque elegante
              overflow: "hidden", // Para evitar que el contenido sobresalga
            }}
          >
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>ID Asistencia</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Tipo</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Inicio</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Fin</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Acciones</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asistencias.map((asistencia) => (
                    <TableRow key={asistencia.idAsistencia}>
                      <TableCell>{asistencia.idAsistencia}</TableCell>
                      <TableCell>
                        {useGetTipoAsistenciaName(asistencia, tiposAsistencia)}
                      </TableCell>
                      <TableCell>
                        {new Date(asistencia.asistenciaInicio).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {asistencia.asistenciaFin
                          ? new Date(asistencia.asistenciaFin).toLocaleString()
                          : "En curso"}
                      </TableCell>
                      <TableCell>
                        {!asistencia.asistenciaFin && ( // Oculta el botón si ya está finalizado
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              handleFinalizar(asistencia.idAsistencia)
                            }
                          >
                            Finalizar
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary" textAlign="center">
            No hay asistencias registradas.
          </Typography>
        )}
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
          <Box
            sx={style}
            textAlign={"center"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TextField
              onChange={handleChange}
              label="Token"
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 12,
              }}
            />

            {/* Select para tipos de asistencia */}
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="tipo-asistencia-label">
                Tipo de Asistencia
              </InputLabel>
              <Select
                labelId="tipo-asistencia-label"
                value={selectedTipoAsistencia}
                onChange={handleSelectChange}
              >
                {tiposAsistencia?.map((tipo) => (
                  <MenuItem
                    key={tipo.idTipoAsistencia}
                    value={tipo.idTipoAsistencia}
                  >
                    {tipo.nombreAsistencia}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={() =>
                handleAccederSesionTrabajo(
                  user.idEmpleado,
                  +selectedTipoAsistencia
                )
              }
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
