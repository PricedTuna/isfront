import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

// Menu con su submenu
const menuItems = [
  { text: "Home", path: "/home" },
  { text: "Autos", path: "/admin/autos" },
  { text: "Administrador", path: "/admin" },
  {
    text: "Catálogos",
    subItems: [
      {text: "Nacionalidades", path: "/admin/nacionalidades" },
      {text: "Ciudades", path: "/admin/ciudades" },
      {text:"Tipos de Contrato", path: "/admin/tiposcontrato"},
      {text:"Tpos de Asistencias", path:"/admin/tiposasistencias"},
      {text:"Tipos de Empleados", path:"/admin/tiposempleados"},
      {text:"Tipos de Licencia de Manejo", path:"/admin/tiposlicencia"},
      {text:"Tipos de Permisos", path:"/admin/tipospermisos"}

    ],
  },
];

export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  const handleExpand = (itemText: string) => {
    setExpanded((prev) => (prev === itemText ? null : itemText));
  };

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

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
          onClick={toggleDrawer(false)} // Cierra el Drawer cuando se haga clic fuera del submenu
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <div key={index}>
                {/* Si el elemento tiene subItems se muestra el boton de expansion */}
                {item.subItems ? (
                  <>
                    <ListItemButton onClick={(e) => { stopPropagation(e); handleExpand(item.text); }}>
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
                            onClick={stopPropagation} // Evita cuando se de click en el boton de expansion no se cierre el drawer
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
                      onClick={stopPropagation} // Evitar cerrar el Drawer si es necesario
                    >
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                )}
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
