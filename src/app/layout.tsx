import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Roboto, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corretoras CVM | Consulta Brasil API",
  description:
    "Consulta e busca de corretoras de valores registradas na CVM, via Brasil API.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${roboto.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <div
            style={{
              display: "flex",
              minHeight: "100dvh",
              flexDirection: "column",
            }}
          >
            <AppHeader />
            <main style={{ flexGrow: 1 }}>{children}</main>
            <AppFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
