import {
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
  colors,
} from "@mui/material";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import HomeNav from "../pages/HomePage/homeNav";
import urls from "../enums/url";

export default function ContactUs() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const resetFields = (event) => {
    setValues({
      name: "",
      email: "",
      message: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.name) {
      newErrors.name = "Name is required";
    }
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!values.message) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Submit the form data
      saveToDatabase();
      resetFields(event);
    }
  };
  async function saveToDatabase() {
    const messageId = "#message-" + uuidv4();
    const timestamp = new Date();

    try{
    const response = await axios.post(`${urls.BASE_URL_CONTACT_MESSAGE}add`, {
      messageId: messageId,
      name: values.name,
      email: values.email,
      message: values.message,
      replied: false,
      savedAt: timestamp,
    });

    if (response.status === 201) {
      alert("Message sent successfully");
      const notificationResponse = await axios.post(
        `${urls.BASE_URL_NOTIFICATION}create`,
        {
          title: "New contact us message",
          message: "Test message",
          type: "contact-us",
        }
      ).catch((error) => {
        console.error("Error creating notification:", error);
      });
    } else {
      alert("Message failed to send");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Message failed to send");
  }
  }

  return (
    <>
      <HomeNav />
      <Container maxWidth="lg" sx={{ marginTop: 15 }}>
        <Paper elevation={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" color="primary" align="center">
                Contact us
              </Typography>
            </Grid>
            <Grid item xs={6} align="center">
              <img
                src="https://i.ibb.co/XjFv4h7/5124556.jpg"
                alt="Contact us"
                height={500}
                width={500}
              />
              <br />
              <Typography variant="subtitle1" color="black" align="center">
                Image by{" "}
                <a href="https://www.freepik.com/free-vector/flat-design-illustration-customer-support_12982910.htm#query=contact%20us&position=0&from_view=search&track=sph">
                  Freepik
                </a>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <form onSubmit={handleSubmit} noValidate>
                <TextField
                  onChange={handleChange}
                  name="name"
                  label="Name"
                  value={values.name}
                  type="text"
                  variant="outlined"
                  margin="normal"
                  required
                  sx={{ width: "70%", input: { background: "transparent" } }}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  color="primary"
                />
                <br />
                <TextField
                  onChange={handleChange}
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  variant="outlined"
                  required
                  margin="normal"
                  sx={{ width: "70%" }}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <br />
                <TextField
                  onChange={handleChange}
                  name="message"
                  label="Contact message"
                  value={values.message}
                  variant="outlined"
                  required
                  margin="normal"
                  multiline
                  rows="10"
                  sx={{ width: "70%" }}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ width: "40%", marginBottom: 2, padding: 1 }}
                >
                  Submit
                </Button>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
