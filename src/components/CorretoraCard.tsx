"use client";

import { memo } from "react";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceIcon from "@mui/icons-material/Place";
import type { Corretora } from "@/types/corretora";
import { formatCnpj } from "@/utils/format";
import { StatusIndicator } from "./StatusIndicator";

interface CorretoraCardProps {
  corretora: Corretora;
}

function CorretoraCardComponent({ corretora }: CorretoraCardProps) {
  const local = [corretora.municipio, corretora.uf].filter(Boolean).join(" / ");

  return (
    <Card
      sx={{
        height: "100%",
        transition: "border-color .2s ease, box-shadow .2s ease",
        "&:hover": { borderColor: "primary.main", boxShadow: 4 },
      }}
    >
      <CardActionArea
        component={Link}
        href={`/corretoras/${corretora.cnpj}`}
        sx={{ height: "100%" }}
      >
        <CardContent sx={{ height: "100%" }}>
          <Stack spacing={0.75} sx={{ height: "100%" }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                lineHeight: 1.25,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {corretora.nome_comercial || corretora.nome_social}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {corretora.nome_social}
            </Typography>

            <Box sx={{ flexGrow: 1, minHeight: 8 }} />

            <Typography
              variant="body2"
              sx={{ fontFamily: "var(--font-geist-mono), monospace", letterSpacing: 0.3 }}
            >
              {formatCnpj(corretora.cnpj)}
            </Typography>

            {local ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "text.secondary",
                }}
              >
                <PlaceIcon sx={{ fontSize: 16 }} />
                <Typography variant="caption">{local}</Typography>
              </Box>
            ) : null}

            <StatusIndicator status={corretora.status} />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export const CorretoraCard = memo(CorretoraCardComponent);
