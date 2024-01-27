
//import Layout from '../components/Layout'
import '../styles/globals.css';
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../components/theme"

export default function App({ Component, pageProps }) {
  return (

<ThemeProvider theme={theme}>

   <Component {...pageProps} />
  
  </ThemeProvider>
  )
}
