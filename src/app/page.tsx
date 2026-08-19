import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CorretorasView } from "@/components/CorretorasView";

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h1" component="h1" gutterBottom>
          Corretoras registradas na CVM
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Busque por nome comercial, razão social ou CNPJ e acesse os detalhes de
          cada corretora.
        </Typography>
      </Box>
      <CorretorasView />
    </Container>
  );
}
