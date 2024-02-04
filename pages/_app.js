
//import Layout from '../components/Layout'
import '../styles/globals.css';
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../components/theme"
import setAuthToken from "./api/auth/axios-set-token";
import { useEffect } from "react";





export default function App({ Component, pageProps }) {

useEffect(() => {
    // Perform localStorage action
    const token = localStorage.getItem("token");
    if (token) {
        setAuthToken(token);
    }
  }, [])
  return (

<ThemeProvider theme={theme}>

   <Component {...pageProps} />
  
  </ThemeProvider>
  )
}
