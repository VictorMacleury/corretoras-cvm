"use client";

import { useAtomValue, useSetAtom } from "jotai";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  setStatusFilterAtom,
  statusFilterAtom,
  statusOptionsAtom,
} from "@/store/corretoras.atoms";
import { formatStatusLabel } from "@/utils/status";

export function StatusFilter() {
  const status = useAtomValue(statusFilterAtom);
  const options = useAtomValue(statusOptionsAtom);
  const setStatus = useSetAtom(setStatusFilterAtom);

  return (
    <TextField
      select
      fullWidth
      label="Situação"
      value={status}
      onChange={(event) => setStatus(event.target.value)}
      disabled={options.length === 0}
      slotProps={{
        select: {
          displayEmpty: true,
          MenuProps: { disableScrollLock: true },
        },
        inputLabel: { shrink: true },
      }}
    >
      <MenuItem value="">Todas as situações</MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {formatStatusLabel(option)}
        </MenuItem>
      ))}
    </TextField>
  );
}
