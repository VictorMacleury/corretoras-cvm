"use client";

import { useMemo } from "react";
import { useAtom, useAtomValue } from "jotai";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import {
  filteredCorretorasAtom,
  pageAtom,
  pageCountAtom,
  paginatedCorretorasAtom,
  searchTermAtom,
} from "@/store/corretoras.atoms";
import { cardsGridSx } from "@/theme/styles";
import { CorretoraCard } from "./CorretoraCard";
import { EmptyState } from "./feedback/EmptyState";

export function CorretoraList() {
  const filtered = useAtomValue(filteredCorretorasAtom);
  const pageItems = useAtomValue(paginatedCorretorasAtom);
  const totalPages = useAtomValue(pageCountAtom);
  const [page, setPage] = useAtom(pageAtom);
  const term = useAtomValue(searchTermAtom);

  const cards = useMemo(
    () =>
      pageItems.map((corretora) => (
        <CorretoraCard key={corretora.cnpj} corretora={corretora} />
      )),
    [pageItems],
  );

  if (filtered.length === 0) {
    return (
      <EmptyState
        title="Nenhuma corretora encontrada"
        description={
          term
            ? `Nada corresponde a “${term}”. Tente outro termo.`
            : "Nenhuma corretora corresponde aos filtros selecionados."
        }
      />
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box sx={cardsGridSx}>{cards}</Box>
      {totalPages > 1 ? (
        <Pagination
          page={page}
          count={totalPages}
          onChange={(_event, value) => {
            setPage(value);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          color="primary"
          sx={{ display: "flex", justifyContent: "center" }}
        />
      ) : null}
    </Box>
  );
}
