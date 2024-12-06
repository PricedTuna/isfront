
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./common/context/AuthContext";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";

function App() {
  // Detecta la preferencia del usuario
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: prefersDarkMode ? "dark" : "light",
        ...(prefersDarkMode
          ? {//Tema Oscuro
              background: {
                default: "#121212",
                paper: "#1e1e1e",
              },
              text: {
                primary: "#ffffff",
              },
            }
          : {//Tema Claro
              background: {
                default: "#ffffff",
                paper: "#f5f5f5",
              },
              text: {
                primary: "#000000",
              },
            }),
      },
      typography: {
        fontFamily: "Roboto, Arial, sans-serif",
      },
    });
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
