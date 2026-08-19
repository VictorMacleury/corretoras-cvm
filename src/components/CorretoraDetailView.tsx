"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCorretora } from "@/hooks/useCorretora";
import { CorretoraDetails } from "./CorretoraDetails";
import { ErrorState } from "./feedback/ErrorState";

interface CorretoraDetailViewProps {
  cnpj: string;
}

export function CorretoraDetailView({ cnpj }: CorretoraDetailViewProps) {
  const { corretora, status, error, reload } = useCorretora(cnpj);

  return (
    <Stack spacing={3}>
      <Button
        component={Link}
        href="/"
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={{ alignSelf: "flex-start" }}
      >
        Voltar para a lista
      </Button>

      {status === "error" || (status === "success" && !corretora) ? (
        <ErrorState
          message={error ?? "Corretora não encontrada."}
          onRetry={reload}
        />
      ) : status === "success" && corretora ? (
        <CorretoraDetails corretora={corretora} />
      ) : (
        <DetailSkeleton />
      )}
    </Stack>
  );
}

function DetailSkeleton() {
  return (
    <Stack spacing={3}>
      <Box>
        <Skeleton variant="rounded" width={120} height={24} />
        <Skeleton variant="text" width="60%" height={44} />
        <Skeleton variant="text" width="40%" />
      </Box>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} variant="rounded" height={150} />
      ))}
    </Stack>
  );
}
