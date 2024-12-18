import {
  AccountCircle,
  Category,
  DirectionsCar,
  ExpandLess,
  ExpandMore,
  Group,
  Home,
  LocationOn,
  Logout,
  Map,
  Person,
  Work,
} from "@mui/icons-material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../common/context/AuthContext";

// Menú con opciones específicas por rol
const menuItems = [
  { text: "Home", path: "/home", icon: <Home />, roles: ["user"] },
  { text: "Home", path: "/admin", icon: <Home />, roles: ["admin"] },
  {
    text: "Perfil",
    path: "/profile",
    icon: <AccountCircle />,
    roles: ["user", "admin"],
  },
  {
    text: "Sesiónes de trabajo",
    path: "/admin/sesionestrabajo",
    icon: <Work />,
    roles: ["admin"],
  },
  {
    text: "Autos",
    path: "/admin/autos",
    icon: <DirectionsCar />,
    roles: ["admin"],
  },
  {
    text: "Usuarios",
    path: "/admin/users",
    icon: <Person />,
    roles: ["admin"],
  },
  {
    text: "Domicilios",
    path: "/admin/domicilio",
    icon: <Map />,
    roles: ["admin"],
  },
  {
    text: "Sucursales",
    path: "/admin/sucursal",
    icon: <LocationOn />,
    roles: ["admin"],
  },
  {
    text: "Empleados",
    path: "/admin/empleados",
    icon: <Group />,
    roles: ["admin"],
  },
  {
    text: "Asistencias",
    path: "/asistencias",
    icon: <ChecklistIcon />,
    roles: ["user"],
  },

  {
    text: "Catálogos",
    icon: <Category />,
    roles: ["admin"],
    subItems: [
      { text: "Nacionalidades", path: "/admin/nacionalidades" },
      { text: "Ciudades", path: "/admin/ciudades" },
      { text: "Tipos de Contrato", path: "/admin/tiposcontrato" },
      { text: "Tipos de Asistencias", path: "/admin/tiposasistencias" },
      { text: "Tipos de Empleados", path: "/admin/tiposempleados" },
      { text: "Tipos de Licencia de Manejo", path: "/admin/tiposlicencia" },
      { text: "Tipos de Permisos", path: "/admin/tipospermisos" },
    ],
  },
];

export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { logout, user } = useAuth(); // Obtén el rol del usuario desde el contexto

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  const handleExpand = (itemText: string) => {
    setExpanded((prev) => (prev === itemText ? null : itemText));
  };

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleLogout = () => {
    logout();
  };

  // Filtrar opciones según el rol del usuario
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.isAdmin ? "admin" : "user")
  );

  return (
    <Box sx={{ flexGrow: 4 }}>
      {/* Botón para abrir la barra lateral */}
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ left: 20, fontSize: "3rem", width: 64, height: 64 }}
      >
        <MenuIcon sx={{ fontSize: "2.5rem" }} />
      </IconButton>

      {/* Drawer que se abre desde el lateral izquierdo */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {filteredMenuItems.map((item, index) => (
              <div key={index}>
                {/* Si el elemento tiene subItems, se muestra el botón de expansión */}
                {item.subItems ? (
                  <>
                    <ListItemButton
                      onClick={(e) => {
                        stopPropagation(e);
                        handleExpand(item.text);
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                      {expanded === item.text ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                      in={expanded === item.text}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {item.subItems.map((subItem, subIndex) => (
                          <ListItemButton
                            key={subIndex}
                            component={Link}
                            to={subItem.path}
                            sx={{ pl: 4 }}
                            onClick={stopPropagation}
                          >
                            <ListItemText primary={subItem.text} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to={item.path}
                      onClick={stopPropagation}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                )}
              </div>
            ))}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={"/login"}
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={`Cerrar sesión`} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
