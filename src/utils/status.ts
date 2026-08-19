import type { ChipProps } from "@mui/material/Chip";

export function statusChipColor(status: string): ChipProps["color"] {
  const value = status.toUpperCase();
  if (value.includes("NORMAL") || value.includes("FUNCIONAMENTO")) return "success";
  if (value.includes("CANCEL") || value.includes("SUSPENS")) return "error";
  return "default";
}

/** Converte a situação (em caixa alta na API) para exibição em caixa de sentença. */
export function formatStatusLabel(status: string): string {
  const normalized = status.trim().toLowerCase();
  if (!normalized) return status;
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
