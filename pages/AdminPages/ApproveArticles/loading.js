import { TableCell, Skeleton, TableRow, TableBody } from "@mui/material";

const rows = [];
for (let i = 0; i < 10; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(<TableRow
    key = {i}
    >
      <TableCell>
        <Skeleton variant="rectangular" width={100} height={20} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" width={100} height={20} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" width={100} height={20} />
      </TableCell>
      <TableCell>
        <center><Skeleton variant="rounded" width={50} height={25} /></center>
      </TableCell>
      </TableRow>);
}
export default function Loading() {
  return (
    <>
    <TableBody>
    {rows}
    </TableBody>
    </>
  );
}
