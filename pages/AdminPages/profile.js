import { Container, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Navbar from "../../components/Navbar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import axios from "axios";
import urls from "../../enums/url";
import { set } from "react-hook-form";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Profile() {

  const [name, setName] = useState(" ");
  const [displayName, setDisplayName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [whatChanged, setWhatChanged] = useState({
    displayName:false,
    imgFile:false
  });
  const [initialDisplayName, setInitialDisplayName] = useState(" ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const res = await axios.get(`${urls.BASE_URL_USER}${userId}`);
        setDisplayName(res.data.displayName);
        setInitialDisplayName(res.data.displayName);

        const name = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        if (name != null && email != null) {
          setName(name);
          setEmail(email);
        } else {
          setName("!user");
        }
        setImgUrl(localStorage.getItem("imgUrl"));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[]);

  const handleChange = (event) => {
    setImgFile(event.target.files?.[0]);
    setDisabled(false);
    setWhatChanged({...whatChanged, imgFile:true});
  };

  const handleChangeName = (event) => {
    setDisplayName(event.target.value);
    setDisabled(false);
    setWhatChanged({...whatChanged, displayName:true});
    if (event.target.value === initialDisplayName) {
      setDisabled(true);
    }
  };

  let base64String = "";

  const handleSubmit = async () => {
    if (whatChanged.displayName) {
      updateDisplayName();
    }
    if (whatChanged.imgFile) {
      sendFileToServer();
    }
    setDisabled(true);
  };

  const updateDisplayName = async () => {
    await axios
      .patch(`${urls.BASE_URL_USER}updateName`, {
        userId: localStorage.getItem("userId"),
        name: displayName,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendFileToServer = async () => {
    const formData = new FormData();
    formData.append("file", imgFile);
    // let reader = new FileReader();
    // reader.onload = function() {
    //  reader.readAsDataURL(imgFile);
    // }
    await axios
      .post(`${urls.BASE_URL_FILE}setUserId`, {
        userId: localStorage.getItem("userId"),
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .post(`${urls.BASE_URL_FILE}upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        localStorage.removeItem("imgUrl");
        reFreshProfileimg();
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .patch(`${urls.BASE_URL_USER}update`, {
        userId: localStorage.getItem("userId"),
        displayName: displayName,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reFreshProfileimg = async () => {
    console.log(localStorage.getItem("userId"));
    const userId = localStorage.getItem("userId");
    await axios
      .get(`${urls.BASE_URL_USER}${userId}`)
      .then((response) => {
        console.log(response);
        localStorage.setItem("imgUrl", response.data.imgUrl);
        setImgUrl(response.data.imgUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar>
        <Container maxWidth="sm">
          <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar
                alt={name}
                src={imgUrl}
                sx={{ width: 100, height: 100, marginBottom: 5 }}
              />
              <Button component="label" role={undefined} variant="contained">
                Upload image
                <VisuallyHiddenInput type="file" onChange={handleChange} />
              </Button>
              <TextField
                id="username"
                label="Username"
                variant="standard"
                value={name}
                disabled
                color="primary"
                sx={{ marginTop: "20px" }}
              />
              <TextField
                id="email"
                label="Email"
                variant="standard"
                value={email}
                disabled
                color="primary"
                sx={{ marginTop: "20px" }}
              />
              <TextField
                id="displayName"
                label="Name"
                variant="standard"
                value={displayName}
                color="primary"
                sx={{ marginTop: "20px" }}
                onChange={handleChangeName}
              />
              <Button
                id="submitBtn"
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={handleSubmit}
                disabled={disabled}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Container>
      </Navbar>
    </>
  );
}
