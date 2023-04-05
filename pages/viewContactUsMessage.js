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

export default function ViewContactUsMessage({}) {
  const router = useRouter();
  const email = router.query.itemEmail;
  const name = router.query.itemName;
  const message = router.query.itemMessage;

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
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

  const handleButtonClick = async (messageId, em) => {
    // const response = await fetch('https://2if7bk5j1b.execute-api.us-east-1.amazonaws.com/msg/message', {
    //   method: 'PATCH',
    //   body: JSON.stringify({ messageId: messageId, email:email, updateKey:replied, updateValue:true})
    // });
    //  console.log(response.status);
    setOpen(true);
    //window.open("mailto:" + email);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ marginTop: 10 }}>
        <Paper elevation={4}>
          <Grid Container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color="primary" align="center">
                View Message
              </Typography>
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
            autoHideDuration={6000}
            onClose={handleClose}
            message="Replied to Message"
            action={action}
          />
        </div>
      </Container>
    </ThemeProvider>
  );
}
