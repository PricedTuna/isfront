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
  Checklist,
  Public,
  LocationCity,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PeopleIcon from "@mui/icons-material/People";
import DrivingIcon from "@mui/icons-material/DirectionsCarFilled";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

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
    icon: <Checklist/>,
    roles: ["user"],
  },
  {
    text: "Catálogos",
    icon: <Category />,
    roles: ["admin"],
    subItems: [
      { text: "Nacionalidades", path: "/admin/nacionalidades", icon: <Public/> },
      { text: "Ciudades", path: "/admin/ciudades", icon: <LocationCity/> },
      { text: "Tipos de Contrato", path: "/admin/tipocontrato", icon: <AssignmentIcon /> },
      { text: "Tipos de Asistencias", path: "/admin/tipoasistencia", icon: <EventAvailableIcon /> },
      { text: "Tipos de Empleados", path: "/admin/tipoempleado", icon: <PeopleIcon /> },
      { text: "Tipos de Licencia de Manejo", path: "/admin/tiposlicencia", icon: <DrivingIcon /> },
      { text: "Tipos de Permisos", path: "/admin/tipospermisos", icon: <AssignmentTurnedInIcon /> },
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

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.isAdmin ? "admin" : "user")
  );

  return (
    <Box sx={{ flexGrow: 4 }}>
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
                            <ListItemIcon>{subItem.icon}</ListItemIcon>
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
