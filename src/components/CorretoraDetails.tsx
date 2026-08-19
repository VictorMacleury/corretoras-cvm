import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Corretora } from "@/types/corretora";
import { StatusIndicator } from "./StatusIndicator";
import {
  formatCep,
  formatCnpj,
  formatCurrency,
  formatDate,
  formatTelefone,
  formatText,
} from "@/utils/format";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textTransform: "uppercase", letterSpacing: 0.5 }}
      >
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500, wordBreak: "break-word" }}>
        {value}
      </Typography>
    </Box>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h2" sx={{ fontSize: "1.05rem", mb: 2 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

export function CorretoraDetails({ corretora }: { corretora: Corretora }) {
  const endereco = [corretora.logradouro, corretora.complemento, corretora.bairro]
    .filter((part) => part && part.trim())
    .join(", ");
  const local = [corretora.municipio, corretora.uf].filter(Boolean).join(" / ");

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h1" component="h1">
          {corretora.nome_comercial || corretora.nome_social}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {corretora.nome_social}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, fontFamily: "var(--font-geist-mono), monospace" }}
        >
          CNPJ {formatCnpj(corretora.cnpj)}
        </Typography>
        <Box sx={{ mt: 1.5 }}>
          <StatusIndicator status={corretora.status} />
        </Box>
      </Box>

      <Section title="Contato">
        <Field label="E-mail" value={formatText(corretora.email)} />
        <Field label="Telefone" value={formatTelefone(corretora.telefone)} />
      </Section>

      <Section title="Endereço">
        <Field label="Logradouro" value={formatText(endereco)} />
        <Field label="Município / UF" value={formatText(local)} />
        <Field label="CEP" value={formatCep(corretora.cep)} />
        <Field label="País" value={formatText(corretora.pais)} />
      </Section>

      <Section title="Registro na CVM">
        <Field label="Código CVM" value={formatText(corretora.codigo_cvm)} />
        <Field label="Tipo" value={formatText(corretora.type)} />
        <Field label="Data de registro" value={formatDate(corretora.data_registro)} />
        <Field
          label="Início da situação"
          value={formatDate(corretora.data_inicio_situacao)}
        />
      </Section>

      <Section title="Patrimônio líquido">
        <Field
          label="Valor declarado"
          value={formatCurrency(corretora.valor_patrimonio_liquido)}
        />
        <Field
          label="Data de referência"
          value={formatDate(corretora.data_patrimonio_liquido)}
        />
      </Section>
    </Stack>
  );
}
