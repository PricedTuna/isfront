import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Botón para abrir la barra lateral */}
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer que se abre desde el lateral izquierdo */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Lista de enlaces en la barra lateral */}
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/home">
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/autos">
                <ListItemText primary="Autos" />
              </ListItemButton>
            </ListItem>
            {/* Agrega más elementos de la lista aquí si es necesario */}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
