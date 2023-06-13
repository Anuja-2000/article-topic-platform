import SaveIcon from '@mui/icons-material/save';
import CheckIcon from '@mui/icons-material/Check';
import React, { useEffect, useState } from 'react'
import { green } from '@mui/material/colors'
import { Box, CircularProgress, Fab } from '@mui/material'

const UserActions = ({ params, rowId , setRowId}) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async() =>{
        setLoading(true);
        setTimeout(() => {} , 1500)
    };
     useEffect(()=>{
        if(rowId === params.id && success) setSuccess(false);
     }, [rowId])
  return (
    <Box
    sx = {{
        m:1,
        position: 'relative'
    }}
    >
        {success ? (
             <Fab
                color = 'primary'
                sx={{
                    width: 40,
                    height:40,
                    bgcolor: green[500],
                    '&hover':{bgcolor: green[700]}
                }}
             >
                <CheckIcon />
             </Fab>
        ): (
            <Fab
            color = 'primary'
            sx={{
                width: 40,
                height:40,
            }}
            disabled = {params.id != rowId || loading}
            onClick = {handleSubmit}
         >
            <SaveIcon />
         </Fab>
        )}
        { loading && (
            <CircularProgress
                size = {52}
                sx = {{
                    color: green[500],
                    position: 'absolute',
                    top : -6,
                    left: -6,
                    zIndex: 1,
                }}
            />
        )
        }
            
    </Box>
  )
}

export default UserActions