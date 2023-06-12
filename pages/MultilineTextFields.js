import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        '& .MuiTextField-root': { m: 1, width: '1300px' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-multiline-static"
          label="Enter Your Text Here"
          multiline
          rows={23}
          defaultValue=""
          variant="filled"
        />
      </div>
    </Box>
  );
}
