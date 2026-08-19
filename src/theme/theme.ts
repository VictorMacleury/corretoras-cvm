import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    // Identidade PagueVeloz/Serasa: magenta como destaque, navy escuro nos botões.
    primary: { main: "#da1b74", contrastText: "#ffffff" },
    secondary: { main: "#0e1020" },
    background: { default: "#f4f6f8", paper: "#ffffff" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "var(--font-roboto), Roboto, Helvetica, Arial, sans-serif",
    h1: { fontSize: "1.7rem", fontWeight: 700 },
    h2: { fontSize: "1.3rem", fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCard: {
      defaultProps: { variant: "outlined" },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "inherit" },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#0e1020",
          color: "#f8fafc",
          transition: "background-color .15s ease",
          "&:hover": { backgroundColor: "#da1b74" },
        },
      },
    },
  },
});
