import { TableCell, Skeleton, TableRow } from "@mui/material";

const rows = [];
for (let i = 0; i < 5; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(<TableRow>
      <TableCell>
        <Skeleton variant="rectangular" width={150} height={20} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" width={200} height={20} />
      </TableCell>
      <TableCell>
        <Skeleton variant="circular" width={70} height={35}/>
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" width={80} height={30}/>
      </TableCell>
      </TableRow>);
}
export default function Loading() {
  return (
    <>
    {rows}
    </>
  );
}
