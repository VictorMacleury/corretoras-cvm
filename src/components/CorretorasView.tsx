"use client";

import { useAtomValue } from "jotai";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useCorretoras } from "@/hooks/useCorretoras";
import { filteredCorretorasAtom, pageAtom } from "@/store/corretoras.atoms";
import { PAGE_SIZE } from "@/utils/pagination";
import { SearchBar } from "./SearchBar";
import { StatusFilter } from "./StatusFilter";
import { CorretoraList } from "./CorretoraList";
import { ListSkeleton } from "./feedback/ListSkeleton";
import { ErrorState } from "./feedback/ErrorState";

export function CorretorasView() {
  const { status, error, reload } = useCorretoras();
  const filtered = useAtomValue(filteredCorretorasAtom);
  const page = useAtomValue(pageAtom);

  const count = filtered.length;
  const start = (page - 1) * PAGE_SIZE + 1;
  const end = Math.min(page * PAGE_SIZE, count);

  return (
    <Stack spacing={2.5}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <SearchBar />
        </Box>
        <Box sx={{ width: { xs: "100%", sm: 280 } }}>
          <StatusFilter />
        </Box>
      </Box>

      {status === "success" && count > 0 ? (
        <Typography variant="body2" color="text.secondary">
          Mostrando {start}–{end} de {count}{" "}
          {count === 1 ? "corretora" : "corretoras"}
        </Typography>
      ) : null}

      {status === "error" ? (
        <ErrorState
          message={error ?? "Erro ao carregar as corretoras."}
          onRetry={reload}
        />
      ) : status === "success" ? (
        <CorretoraList />
      ) : (
        <ListSkeleton />
      )}
    </Stack>
  );
}
