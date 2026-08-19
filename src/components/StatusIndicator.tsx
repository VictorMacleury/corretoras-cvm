import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formatStatusLabel, statusChipColor } from "@/utils/status";

interface StatusIndicatorProps {
  status: string;
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const color = statusChipColor(status);
  const dotColor =
    color === "success"
      ? "success.main"
      : color === "error"
        ? "error.main"
        : "grey.500";

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: dotColor,
          flexShrink: 0,
        }}
      />
      <Typography variant="caption" color="text.secondary">
        {formatStatusLabel(status)}
      </Typography>
    </Box>
  );
}
