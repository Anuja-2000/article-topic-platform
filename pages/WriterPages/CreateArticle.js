import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import Navbar from "../../components/createArticleNavbar";

const TextEditor = dynamic(() => import("../../components/textEditor"), {
  ssr: false,
});

function CreateArticles() {
  const [isQuillLoaded, setIsQuillLoaded] = useState(false);
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    // Dynamically import Quill only in the browser
    import("react-quill")
      .then((Quill) => {
        // Set the QuillEditor component
        setIsQuillLoaded(() => Quill.default);
      })
      .catch((error) => {
        console.error("Failed to load Quill", error);
      });
  }, []);

  const handleEditorChange = (value) => {
    // Handling editor content changes
    console.log(value);
    setEditorValue(value);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar /> {/* WriterNavbar here */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
              marginBottom: "30px",
            }}
          >
            <br></br>
            <br></br>
            Write Article
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {isQuillLoaded ? (
              <TextEditor value={editorValue} onChange={handleEditorChange} />
            ) : (
              <p>Loading Editor...</p>
            )}
          </Grid>
        </Stack>
      </Box>
    </Box>
  );
}

export default CreateArticles;
