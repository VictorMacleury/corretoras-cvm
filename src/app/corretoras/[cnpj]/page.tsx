import Container from "@mui/material/Container";
import { CorretoraDetailView } from "@/components/CorretoraDetailView";

interface CorretoraPageProps {
  params: Promise<{ cnpj: string }>;
}

export default async function CorretoraPage({ params }: CorretoraPageProps) {
  const { cnpj } = await params;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 4 } }}>
      <CorretoraDetailView cnpj={cnpj} />
    </Container>
  );
}
