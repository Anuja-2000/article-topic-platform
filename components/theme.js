import { createTheme } from "@mui/material/styles"
export const theme = createTheme({
  palette: {
    primary: {
      main: "#0080FE",
      dark: '#000080',
      light: '#94ECBE',
      contrastText: '#fff'
    },
    secondary: {
      main: "#535C91",
      dark: '#1B1A55',
      light: '#9290C3',
      contrastText: '#fff'
    },
    action: {
      disabled: '#0080FE',
  },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#0080FE',
          color: '#FFFFFF',
        },
        MuiTableHead: {
          backgroundColor: '#0080FE',
          color: '#FFFFFF',
        }
      },
    },
  },

});