import type { SxProps, Theme } from "@mui/material/styles";

export const cardsGridSx: SxProps<Theme> = {
  display: "grid",
  gap: 2,
  gridAutoRows: "224px",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(4, 1fr)",
  },
};
