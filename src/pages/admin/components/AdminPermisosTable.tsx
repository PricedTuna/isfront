import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useGetTiposPermiso from "../../../common/hooks/permiso/useGetTiposPermiso";
import useGetEmpleado from "../../../common/hooks/useGetEmpleado";
import { PermisoDto } from "../../../dtos/permiso/PermisoDto";

interface PermisosTableProps {
  permisos: PermisoDto[];
  onAprobar: (idPermiso: number) => void;
}

const PermisosTable: React.FC<PermisosTableProps> = ({
  permisos,
  onAprobar,
}) => {
  const { fetchTiposPermiso, tiposPermiso } = useGetTiposPermiso();
  const { fetchEmpleado } = useGetEmpleado();

  const [empleados, setEmpleados] = useState<Record<number, string>>({});

  // Cargar tipos de permiso al inicio
  useEffect(() => {
    fetchTiposPermiso();
  }, []);

  // Cargar empleados basado en permisos
  useEffect(() => {
    const loadEmpleados = async () => {
      const empleadosMap: Record<number, string> = {};
      for (const permiso of permisos) {
        if (!empleadosMap[permiso.idEmpleado]) {
          const empleado = await fetchEmpleado(permiso.idEmpleado);
          if (!empleado) return;
          empleadosMap[permiso.idEmpleado] = empleado.nombreEmpleado; // Ajusta a la propiedad real del nombre
        }
      }
      setEmpleados(empleadosMap);
    };

    if (permisos.length > 0) {
      loadEmpleados();
    }
  }, [permisos]);

  if (!permisos || permisos.length === 0) {
    return (
      <Typography variant="body1" textAlign="center" mt={2}>
        No se encontraron permisos registrados.
      </Typography>
    );
  }

  if (!tiposPermiso) return null;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Tipo de Permiso</TableCell>
          <TableCell>Descripción</TableCell>
          <TableCell>Aprobado</TableCell>
          <TableCell>Empleado</TableCell>
          <TableCell>Fecha de Solicitud</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {permisos.map((permiso) => (
          <TableRow key={permiso.idPermiso}>
            <TableCell>{permiso.idPermiso}</TableCell>
            <TableCell>
              {
                tiposPermiso.find(
                  (tipoPermiso) =>
                    tipoPermiso.idTipoPermiso === permiso.idTipoPermiso
                )?.nombrePermiso
              }
            </TableCell>
            <TableCell>{permiso.descripcion}</TableCell>
            <TableCell>{permiso.aprobado ? "Sí" : "No"}</TableCell>
            <TableCell>
              {empleados[permiso.idEmpleado] || "Cargando..."}
            </TableCell>
            <TableCell>
              {new Date(permiso.createDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {!permiso.aprobado && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onAprobar(permiso.idPermiso)}
                >
                  Aprobar
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PermisosTable;
