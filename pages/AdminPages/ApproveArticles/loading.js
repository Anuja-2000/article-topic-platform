import { TableBody,TableCell,Skeleton } from "@mui/material"

export default function Loading(){
    return(
        <TableBody>
                      <TableCell colSpan={4}>
                        <Skeleton
                          variant="rectangular"
                          sx={{ width: "100%" }}
                          height={180}
                        />
                      </TableCell>
                    </TableBody>
    )
}