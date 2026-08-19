import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SearchOffIcon from "@mui/icons-material/SearchOff";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Box sx={{ textAlign: "center", py: 8, color: "text.secondary" }}>
      <SearchOffIcon sx={{ fontSize: 48, mb: 1, opacity: 0.6 }} />
      <Typography variant="h6" color="text.primary">
        {title}
      </Typography>
      {description ? <Typography variant="body2">{description}</Typography> : null}
    </Box>
  );
}
