import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { cardsGridSx } from "@/theme/styles";

export function ListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <Box sx={cardsGridSx}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} sx={{ height: "100%" }}>
          <CardContent>
            <Stack spacing={1.2}>
              <Skeleton variant="rounded" width={96} height={22} />
              <Skeleton variant="text" width="80%" height={28} />
              <Skeleton variant="text" width="55%" />
              <Skeleton variant="text" width="40%" />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
