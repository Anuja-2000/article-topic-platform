"use client";

import { Send } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";
import { theme } from "../components/theme";
import axios from "axios";
import NavBar from "../components/Navbar";
import { set } from "react-hook-form";
import Divider from "@mui/material/Divider";
import urls from "../enums/url";





export default function ViewContactUsMessage() {
   const router = useRouter();
   const id = router.query.id;

  React.useEffect(() => {
    const response = axios.get(`${urls.BASE_URL_CONTACT_MESSAGE}get`,{
      params: {
        "id":id
      }
    }).then((res) => { 
      setResponse({
        "messageId": res.data.messageId,
        "name": res.data.name,
        "email": res.data.email,
        "message": res.data.message,
      });
    } ).catch((error) => {
      console.log(error);
    })
  },[]);

  let [response,setResponse] = React.useState({
    messageId:"",
    name:"",
    email:"",
    message:""
  })
  
  var messageId = response.messageId;
  var name = response.name;
  var email = response.email;
  var message = response.message;

  const updateReplied = async (value) => {
    const reponse = await axios.put(`${urls.BASE_URL_CONTACT_MESSAGE}update`, {
      "messageId": messageId,
      "email": email,
      "name" : name,
      "message":message,
      "replied": value,
      "savedAt":""
    }).then((res) => {
      console.log(res);
    }).catch((error) => {
      console.log(error);
    })
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (reason === "undo") {
      console.log("undo");
      updateReplied(false);
      return;
    } 

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={()=>handleClose("undo")}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const handleButtonClick = () => {
    updateReplied(true);
    setOpen(true);
    //window.open("mailto:" + email);
  };
  return (
    <>
      <NavBar>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Paper elevation={4}>
            <Grid Container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" color="primary" align="center" sx={{ p: 1 }}>
                  View Message
                </Typography>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  color="primary.dark"
                  align="left"
                  padding={2}
                >
                  Name : {name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  color="primary.dark"
                  align="left"
                  marginLeft={2}
                >
                  Email : {email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  color="primary.dark"
                  align="left"
                  padding={2}
                >
                  Message : {message}
                </Typography>
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button
                  variant="contained"
                  endIcon={<Send />}
                  onClick={handleButtonClick}
                  sx={{ margin: 2 }}
                >
                  Reply
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <div>
            <Snackbar
              open={open}
              autoHideDuration={5000}
              onClose={handleClose}
              message="Replied to Message"
              action={action}
            />
          </div>
        </Container>
      </ThemeProvider>
      </NavBar>
    </>
  );
}
