import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: "center" }}>
      <Typography variant="h1" sx={{ fontSize: "4rem", fontWeight: 700 }}>
        404
      </Typography>
      <Typography variant="h6" gutterBottom>
        Página não encontrada
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        O endereço acessado não existe ou foi movido.
      </Typography>
      <Box>
        <Button href="/" variant="contained">
          Voltar para o início
        </Button>
      </Box>
    </Container>
  );
}
