
//import Layout from '../components/Layout'
import '../styles/globals.css';
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles"
import { theme } from "../components/theme"
import setAuthToken from "./api/auth/axios-set-token";
import { useEffect, useState } from "react";


export default function App({ Component, pageProps }) {

const [isloading, setLoading] = useState(true);

useEffect(() => {
    // Perform localStorage action
    if(isloading){
      const token = localStorage.getItem("token");
      if (token) {
          setAuthToken(token);
          setLoading(false);
      }
    }
  }, [isloading])
  return (

<ThemeProvider theme={theme}>

   <Component {...pageProps} />
  
  </ThemeProvider>
  )
}
