import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useGetPermisosByEmpleado from "../../../common/hooks/permiso/useGetPermisosByEmpleado";

interface PermisosModalProps {
  isOpen: boolean;
  onClose: () => void;
  idEmpleado: number;
}

const PermisosModal: React.FC<PermisosModalProps> = ({
  isOpen,
  onClose,
  idEmpleado,
}) => {
  const { permisos, fetchPermisosByEmpleado } = useGetPermisosByEmpleado();

  useEffect(() => {
    if (isOpen && idEmpleado) {
      fetchPermisosByEmpleado(idEmpleado);
    }
  }, [isOpen, idEmpleado]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Typography variant="h6">Historial de Permisos</Typography>
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {permisos && permisos.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tipo de Permiso</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Aprobado</TableCell>
                <TableCell>Estatus</TableCell>
                <TableCell>Fecha de Creación</TableCell>
                <TableCell>Última Actualización</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permisos.map((permiso) => (
                <TableRow key={permiso.idPermiso}>
                  <TableCell>{permiso.idPermiso}</TableCell>
                  <TableCell>{permiso.idTipoPermiso}</TableCell>
                  <TableCell>{permiso.descripcion}</TableCell>
                  <TableCell>
                    {permiso.aprobado ? "Sí" : "No"}
                  </TableCell>
                  <TableCell>{permiso.estatus}</TableCell>
                  <TableCell>
                    {new Date(permiso.createDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(permiso.updateDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="body1" textAlign="center" mt={2}>
            No se encontraron permisos registrados.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PermisosModal;
