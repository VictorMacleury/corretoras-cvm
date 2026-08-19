"use client";

import { useAtomValue, useSetAtom } from "jotai";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { searchTermAtom, setSearchTermAtom } from "@/store/corretoras.atoms";

export function SearchBar() {
  const term = useAtomValue(searchTermAtom);
  const setTerm = useSetAtom(setSearchTermAtom);

  return (
    <TextField
      fullWidth
      value={term}
      onChange={(event) => setTerm(event.target.value)}
      label="Buscar corretora"
      placeholder="Nome comercial, razão social ou CNPJ"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: term ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="Limpar busca"
                size="small"
                onClick={() => setTerm("")}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  );
}
