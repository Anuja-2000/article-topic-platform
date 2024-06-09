import { TableCell, Skeleton, TableRow } from "@mui/material";


export default function Loading() {
  return (
    <>
    <Box display="flex" justifyContent="space-between">
          <Skeleton variant="h4" width={300}/>
          <Skeleton variant="h5" width={350}/>
        </Box>
    </>
  );
}
