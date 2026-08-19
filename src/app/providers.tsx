"use client";

import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider as JotaiProvider } from "jotai";
import { theme } from "@/theme/theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <JotaiProvider>{children}</JotaiProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
