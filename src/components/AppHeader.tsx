import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export function AppHeader() {
  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "background.paper", borderBottom: 1, borderColor: "divider" }}
    >
      <Toolbar>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <AccountBalanceIcon sx={{ color: "primary.main" }} />
          <Box>
            <Typography
              component="span"
              sx={{ display: "block", fontWeight: 700, lineHeight: 1.1 }}
            >
              Corretoras CVM
            </Typography>
            <Typography component="span" variant="caption" color="text.secondary">
              Dados públicos via Brasil API
            </Typography>
          </Box>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
