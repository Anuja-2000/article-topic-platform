// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Avatar,
//   Box,
//   Grid,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import Navbar from "../../components/createArticleNavbar";
// import AlertDialog from "./AlertDialog";
// import axios from "axios";

// const Settings = () => {
//   const [userId, setUserId] = useState(null);
//   const [username, setUsername] = useState("");
//   const [initialEmail, setInitialEmail] = useState("");
//   const [articlesCount, setArticlesCount] = useState(0);
//   const [preview, setPreview] = useState("");
//   const [userCreatedDate, setUserCreatedDate] = useState("");
//   const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
//   const [open, setOpen] = useState(false);

//   const [type, setType] = useState("");
//   const [imgUrl, setImgUrl] = useState("");

//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     const storedUserName = localStorage.getItem("username");
//     setUserId(storedUserId);
//     setUsername(storedUserName);
//   }, []);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/api/article/count/${userId}`
//         );
//         console.log("Articles count:", response.data);
//         setArticlesCount(response.data);
//       } catch (error) {
//         console.error("Error fetching articles:", error);
//         alert(
//           "Failed to load articles. Please check your network and try again."
//         );
//       }
//     };

//     if (userId) {
//       fetchArticles();
//     }
//   }, [userId]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/api/user/${userId}`
//         );
//         console.log("User data:", response.data);
//         const { email, savedAt, type, imgUrl } = response.data;
//         setInitialEmail(email);
//         setType(type);
//         setImgUrl(imgUrl);
//         setUserCreatedDate(new Date(savedAt).toDateString());
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         alert(
//           "Failed to load user data. Please check your network and try again."
//         );
//       }
//     };

//     if (userId) {
//       fetchUser();
//     }
//   }, [userId]);

//   const resizeImage = (file, maxWidth, maxHeight, callback) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (event) => {
//       const img = new Image();
//       img.src = event.target.result;
//       img.onload = () => {
//         let canvas = document.createElement("canvas");
//         let ctx = canvas.getContext("2d");
//         let width = img.width;
//         let height = img.height;

//         if (width > height) {
//           if (width > maxWidth) {
//             height = Math.round((height *= maxWidth / width));
//             width = maxWidth;
//           }
//         } else {
//           if (height > maxHeight) {
//             width = Math.round((width *= maxHeight / height));
//             height = maxHeight;
//           }
//         }

//         canvas.width = width;
//         canvas.height = height;
//         ctx.drawImage(img, 0, 0, width, height);

//         canvas.toBlob(
//           (blob) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(blob);
//             reader.onloadend = () => {
//               callback(reader.result);
//             };
//           },
//           file.type,
//           0.7
//         ); // 0.7 is the quality (70%)
//       };
//     };
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedProfilePicture = localStorage.getItem("profilePicture");
//       if (savedProfilePicture) {
//         setPreview(savedProfilePicture);
//       }
//     }
//   }, []);

//   const handleProfilePictureChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       resizeImage(file, 150, 150, (base64String) => {
//         setPreview(base64String);
//         localStorage.setItem("profilePicture", base64String); // Save base64 string to localStorage
//         setIsSaveButtonEnabled(true); // Enable save button when profile picture is changed
//       });
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const profileData = {
//       userId: userId,
//       name: username,
//       imgUrl: imgUrl,
//       type: type,
//       email: initialEmail,
//     };

//     console.log("Profile data:", profileData);
//     try {
//       const response = axios.patch(
//         `http://localhost:3001/api/user/update`,
//         profileData
//       );
//       console.log(response);
//       alert("Profile updated successfully!");
//       localStorage.setItem("username", username);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert(
//         "Failed to update profile. Please check your network and try again."
//       );
//     }
//   };

//   const handleDeleteAccount = () => {
//     // Open the dialog
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleConfirmDelete = () => {
//     // TODO: Implement delete account logic here
//     setOpen(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("type");
//     localStorage.removeItem("username");
//     localStorage.removeItem("email");
//     localStorage.removeItem("imgUrl");

//     window.location.href = "/login";
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: 'url("/background.jpg")',
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Navbar>
//         <Container
//           component="main"
//           maxWidth="md"
//           sx={{
//             backgroundColor: "rgba(255, 255, 255, 0.9)",
//             borderRadius: 2,
//             padding: 3,
//             boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               paddingTop: 4,
//             }}
//           >
//             <Typography component="h1" variant="h5" gutterBottom>
//               Profile Settings
//             </Typography>
//             <Box sx={{ position: "relative", display: "inline-block" }}>
//               <Avatar
//                 sx={{ width: 150, height: 150, marginBottom: 2 }}
//                 src={preview || "/defaultAvatar.png"}
//               />
//               <input
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 id="profile-picture"
//                 type="file"
//                 onChange={handleProfilePictureChange}
//               />
//               <label htmlFor="profile-picture">
//                 <IconButton
//                   color="primary"
//                   aria-label="upload picture"
//                   component="span"
//                   sx={{ position: "absolute", bottom: 0, right: 0 }}
//                 >
//                   <PhotoCamera />
//                 </IconButton>
//               </label>
//             </Box>
//             <Typography variant="body1" sx={{ marginBottom: 2 }}>
//               {initialEmail}{" "}
//               {/* This will be replaced the fetched email address */}
//             </Typography>
//             <Box
//               component="form"
//               onSubmit={handleSubmit}
//               noValidate
//               sx={{ mt: 3, width: "100%" }}
//             >
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     id="username"
//                     label="Username"
//                     name="username"
//                     autoComplete="username"
//                     autoFocus
//                     value={username}
//                     onChange={(e) => {
//                       setUsername(e.target.value);
//                       setIsSaveButtonEnabled(true);
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Paper
//                     elevation={3}
//                     sx={{
//                       padding: "16.5px 14px",
//                       display: "flex",
//                       flexDirection: "column",
//                       backgroundColor: "#f5f5f5",
//                     }}
//                   >
//                     <Typography variant="subtitle1" color="textSecondary">
//                       Joined Date
//                     </Typography>
//                     <Typography variant="body1">{userCreatedDate}</Typography>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Paper
//                     elevation={3}
//                     sx={{
//                       padding: "16.5px 14px",
//                       display: "flex",
//                       flexDirection: "column",
//                       backgroundColor: "#f5f5f5",
//                     }}
//                   >
//                     <Typography variant="subtitle1" color="textSecondary">
//                       Total Number of Articles Created
//                     </Typography>
//                     <Typography variant="body1">{articlesCount}</Typography>
//                   </Paper>
//                 </Grid>
//               </Grid>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 3, mb: 2 }}
//                 disabled={!isSaveButtonEnabled}
//               >
//                 Save Changes
//               </Button>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="error"
//                 sx={{ mt: 2, mb: 2 }}
//                 onClick={handleDeleteAccount}
//               >
//                 Delete Account
//               </Button>
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 color="secondary"
//                 sx={{ mb: 2 }}
//                 onClick={handleLogout}
//               >
//                 Log Out
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//       </Navbar>
//       <AlertDialog
//         open={open}
//         onClose={handleClose}
//         onConfirm={handleConfirmDelete}
//       />
//     </div>
//   );
// };

// export default Settings;

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  Box,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Navbar from "../../components/createArticleNavbar";
import axios from "axios";

const Settings = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [articlesCount, setArticlesCount] = useState(0);
  const [preview, setPreview] = useState("");
  const [userCreatedDate, setUserCreatedDate] = useState("");
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  const [type, setType] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("username");
    setUserId(storedUserId);
    setUsername(storedUserName);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/article/count/${userId}`
        );
        console.log("Articles count:", response.data);
        setArticlesCount(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        alert(
          "Failed to load articles. Please check your network and try again."
        );
      }
    };

    if (userId) {
      fetchArticles();
    }
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/user/${userId}`
        );
        console.log("User data:", response.data);
        const { email, savedAt, type, imgUrl } = response.data;
        setInitialEmail(email);
        setType(type);
        setImgUrl(imgUrl);
        setUserCreatedDate(new Date(savedAt).toDateString());
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert(
          "Failed to load user data. Please check your network and try again."
        );
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              callback(reader.result);
            };
          },
          file.type,
          0.7
        ); // 0.7 is the quality (70%)
      };
    };
  };

  useEffect(() => {
    function pfpLoad() {
      if (typeof window !== "undefined") {
        const savedProfilePicture = localStorage.getItem(
          `profilePicture-${userId}`
        );
        if (savedProfilePicture) {
          setPreview(savedProfilePicture);
        }
      }
    }

    if (userId) {
      pfpLoad();
    }
  }, [userId]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      resizeImage(file, 150, 150, (base64String) => {
        setPreview(base64String);
        localStorage.setItem(`profilePicture-${userId}`, base64String); // Save base64 string to localStorage
        setIsSaveButtonEnabled(true); // Enable save button when profile picture is changed
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const profileData = {
      userId: userId,
      name: username,
      imgUrl: imgUrl,
      type: type,
      email: initialEmail,
    };

    console.log("Profile data:", profileData);
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/user/update`,
        profileData
      );
      console.log(response);
      alert("Profile updated successfully!");
      localStorage.setItem("username", username);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(
        "Failed to update profile. Please check your network and try again."
      );
    }
  };

  const handleDeleteAccount = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/user/${userId}`);
      alert("Account deleted successfully!");
      handleLogout();
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(
        "Failed to delete account. Please check your network and try again."
      );
    }
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("imgUrl");

    window.location.href = "/login";
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar>
        <Container
          component="main"
          maxWidth="md"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
            padding: 3,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 4,
            }}
          >
            <Typography component="h1" variant="h5" gutterBottom>
              Profile Settings
            </Typography>
            <Box sx={{ position: "relative", display: "inline-block" }}>
              <Avatar
                sx={{ width: 150, height: 150, marginBottom: 2 }}
                src={preview || "/defaultAvatar.png"}
              />
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="profile-picture"
                type="file"
                onChange={handleProfilePictureChange}
              />
              <label htmlFor="profile-picture">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{ position: "absolute", bottom: 0, right: 0 }}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {initialEmail}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3, width: "100%" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setIsSaveButtonEnabled(true);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "16.5px 14px",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <Typography variant="subtitle1" color="textSecondary">
                      Joined Date
                    </Typography>
                    <Typography variant="body1">{userCreatedDate}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: "16.5px 14px",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <Typography variant="subtitle1" color="textSecondary">
                      Total Number of Articles Created
                    </Typography>
                    <Typography variant="body1">{articlesCount}</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isSaveButtonEnabled}
              >
                Save Changes
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 2, mb: 2 }}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mb: 2 }}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Box>
          </Box>
        </Container>
      </Navbar>
      <ConfirmationDialog
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Account Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;
