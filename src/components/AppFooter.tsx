import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", mb: 1.5 }}>
      {children}
    </Typography>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
      sx={{
        display: "block",
        color: "rgba(255,255,255,0.72)",
        py: 0.4,
        transition: "color .15s ease",
        "&:hover": { color: "primary.main" },
      }}
    >
      {children}
    </Link>
  );
}

export function AppFooter() {
  return (
    <Box component="footer" sx={{ bgcolor: "#1c1c1c", color: "rgba(255,255,255,0.72)" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", sm: "1.4fr 1fr 1fr" },
          }}
        >
          <Box>
            <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", mb: 1 }}>
              Corretoras CVM
            </Typography>
            <Typography variant="body2" sx={{ maxWidth: 320 }}>
              Consulta de corretoras da CVM.
            </Typography>
          </Box>

          <Box>
            <FooterHeading>Endereço</FooterHeading>
            <Typography variant="body2">
              Av. das Corretoras, 1.000 — 4º andar, Centro, São Paulo/SP · CEP
              01000-000
            </Typography>
          </Box>

          <Box>
            <FooterHeading>Contato</FooterHeading>
            <FooterLink href="tel:08000000000">0800 000 0000</FooterLink>
            <FooterLink href="mailto:contato@corretorascvm.com.br">
              contato@corretorascvm.com.br
            </FooterLink>
            <FooterLink href="https://brasilapi.com.br/docs#tag/Corretoras">
              Brasil API — Corretoras
            </FooterLink>
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.12)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography variant="caption">© 2026 Corretoras CVM</Typography>
          <Typography variant="caption">Dados públicos via Brasil API</Typography>
        </Box>
      </Container>
    </Box>
  );
}
