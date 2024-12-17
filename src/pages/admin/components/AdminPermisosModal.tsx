import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import useGetPermisosBySesionTrabajo from "../../../common/hooks/permiso/useGetPermisosBySesionTrabajo";
import AdminPermisosTable from "./AdminPermisosTable";

interface PermisosModalProps {
  isOpen: boolean;
  onClose: () => void;
  idSesionTrabajo: number;
  onAprobar: (idPermiso: number) => Promise<void>
}

const AdminPermisosModal: React.FC<PermisosModalProps> = ({
  isOpen,
  onClose,
  idSesionTrabajo,
  onAprobar
}) => {
  const { fetchPermisosBySesionTrabajo, permisosBySesionTrabajo } =
    useGetPermisosBySesionTrabajo();

  const handleAprobar = (idPermiso: number) => {
    onAprobar(idPermiso);
  };

  useEffect(() => {
    if (isOpen && idSesionTrabajo) {
      fetchPermisosBySesionTrabajo(idSesionTrabajo);
    }
  }, [isOpen, idSesionTrabajo]);

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
        <AdminPermisosTable
          onAprobar={handleAprobar}
          permisos={permisosBySesionTrabajo ?? []}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AdminPermisosModal;
