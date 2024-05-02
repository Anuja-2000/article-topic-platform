import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import dynamic from "next/dynamic";
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
    <div>
      <Navbar /> {/* WriterNavbar here */}
      <div className="App" style={{ marginTop: "60px" }}>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="center" spacing={4}>
            <Stack spacing={1}>
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
                  paddingLeft: "10px",
                  marginBottom: "30px",
                }}
              >
                Write Article h
              </Typography>
              <Stack alignItems="center" direction="row" spacing={1}></Stack>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={4}>
            <Grid container spacing={3}>
              {/* ( */}
              {isQuillLoaded ? (
                <TextEditor value={editorValue} onChange={handleEditorChange} />
              ) : (
                <p>Loading editor...</p>
              )}
            </Grid>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}

export default CreateArticles;
