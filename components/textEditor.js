// import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import dynamic from "next/dynamic";
// import "quill/dist/quill.snow.css";
// import styles from "../styles/EditingArea.module.css";
// import { ARTICLE_ROUTES } from "../public/constants/routes";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
// import ArticleCoverImageUploader from './ArticleCoverImageUploader';
// import ImageUploader from "./ImageUploader";

// import CircularProgress from "@mui/material/CircularProgress";
// import { set } from "react-hook-form";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const TextEditor = () => {
//   const [text, setText] = useState("");
//   const [articleName, setArticleName] = useState("");
//   const [userId, setUserId] = useState("");
//   const [images, setImages] = useState([]);
//   const [coverImage, setCoverImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     setUserId(userId);
//     if (!userId) {
//       window.location.href = "/login";
//     }
//   }, []);

//   const handleChange = (value) => {
//     setText(value);
//   };

//   const handleCoverImageUpload = (base64Image) => {
//     setCoverImage(base64Image);

//     console.log("Cover Image: ", base64Image);
//   };

//   const handleSave = () => {

//     setLoading(true);
//     const articleId = articleName + "-" + uuidv4();
//     const articleData = {
//       articleId: articleId,
//       userId: userId,
//       title: articleName,
//       content: text,
//       savedType: "saved",
//       coverImage: coverImage,
//     };

//     console.log(articleData)

//     const config = {
//       method: "post",
//       url: ARTICLE_ROUTES.CREATE,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: articleData,
//     };

//     axios(config)
//       .then((response) => {
//         alert("Article saved successfully");
//         setLoading(false);
//         window.location.reload();
//       })
//       .catch((error) => {
//         alert("Failed to save article: " + error.message);
//       });
//   };

//   const handleSaveAsDraft = () => {

//     setLoading(true);
//     const articleId = articleName + "-" + uuidv4();
//     const articleData = {
//       articleId: articleId,
//       userId: userId,
//       title: articleName,
//       content: text,
//       savedType: "draft",
//       coverImage: coverImage,
//     };

//     const config = {
//       method: "post",
//       url: ARTICLE_ROUTES.CREATE,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: articleData,
//     };

//     axios(config)
//       .then((response) => {
//         alert("Draft saved successfully");
//         setLoading(false);
//         window.location.reload();
//       })
//       .catch((error) => {
//         alert("Failed to save draft: " + error.message);
//       });
//   };

//   const modules = {
//     toolbar: [
//       [{ header: "1" }, { header: "2" }, { font: [] }],
//       [{ size: [] }],
//       ["bold", "italic", "underline", "strike", "blockquote"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link", "image", "video"],
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
//     "font",
//     "size",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "link",
//     "image",
//     "video",
//   ];

//   return (
//     <div className={styles.textEditorArea}>
//       <ArticleCoverImageUploader onImageUpload={handleCoverImageUpload}/>
//       <ImageUploader onImagesChange={setImages} />
//       <input
//         type="text"
//         placeholder="Name of Article"
//         value={articleName}
//         onChange={(e) => setArticleName(e.target.value)}
//         className={styles.articleNameInput}
//       />
//       <br />
//       <br />
//       {loading? <CircularProgress /> : 
//       <>
//         <Button variant="contained" color="primary" onClick={handleSave}>
//           Save Article
//         </Button>{" "}
//         <Button variant="contained" color="secondary" onClick={handleSaveAsDraft}>
//           Save As Draft
//         </Button>
//       </>
//       }
//       {" "}
//       <br />
//       <br />
//       {typeof window !== "undefined" && (
//         <ReactQuill
//           value={text}
//           onChange={handleChange}
//           modules={modules}
//           formats={formats}
//           style={{ height: "530px", width: "1000px" }}
//         />
//       )}
//     </div>
//   );
// };

// export default TextEditor;

import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import styles from "../styles/EditingArea.module.css";
import { ARTICLE_ROUTES } from "../public/constants/routes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ArticleCoverImageUploader from "./ArticleCoverImageUploader";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { alpha } from "@mui/material/styles";
import TemplateSelector from "./Templates/TemplateSelector";
import Divider from "@mui/material/Divider";
import { Typography } from '@mui/material';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = () => {
  const [text, setText] = useState("");
  const [articleName, setArticleName] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [domains, setDomains] = useState([]);
  const [userId, setUserId] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    if (!userId) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    // Fetch article domains from the backend
    const fetchDomains = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/topicDomains/get');
        setDomains(response.data);
      } catch (error) {
        console.error("Failed to fetch domains", error);
      }
    };

    fetchDomains();
  }, []);

  const handleChange = (value) => {
    setText(value);
  };

  const handleCoverImageUpload = (base64Image) => {
    setCoverImage(base64Image);
    console.log("Cover Image: ", base64Image);
  };

  const handleSave = () => {
    setLoading(true);
    const articleId = articleName + "-" + uuidv4();
    const articleData = {
      articleId: articleId,
      userId: userId,
      title: articleName,
      content: text,
      savedType: "saved",
      coverImage: coverImage,
      domain: selectedDomain, 
    };

    console.log(articleData);

    const config = {
      method: "post",
      url: ARTICLE_ROUTES.CREATE,
      headers: {
        "Content-Type": "application/json",
      },
      data: articleData,
    };

    axios(config)
      .then((response) => {
        alert("Article saved successfully");
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        alert("Failed to save article: " + error.message);
        setLoading(false);
      });
  };

  const handleSaveAsDraft = () => {
    setLoading(true);
    const articleId = articleName + "-" + uuidv4();
    const articleData = {
      articleId: articleId,
      userId: userId,
      title: articleName,
      content: text,
      savedType: "draft",
      coverImage: coverImage,
      domain: selectedDomain, 
    };

    const config = {
      method: "post",
      url: ARTICLE_ROUTES.CREATE,
      headers: {
        "Content-Type": "application/json",
      },
      data: articleData,
    };

    axios(config)
      .then((response) => {
        alert("Draft saved successfully");
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        alert("Failed to save draft: " + error.message);
        setLoading(false);
      });
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const handleTemplateSelect = (templateContent) => {
    setText(templateContent);
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  return (
    <div className={styles.textEditorArea}>
      <ArticleCoverImageUploader onImageUpload={handleCoverImageUpload} />
      <ImageUploader onImagesChange={setImages} />
      <Divider />
      <div style={{ width: "100%", marginTop: "40px", marginBottom: "40px", textAlign: "left" }}>
        <Typography variant="h4" marginBottom={2} color={"primary.dark"} marginTop={2}>Choose a Template</Typography>
        <Typography variant="body1" marginBottom={2} color={"primary.dark"} marginTop={2}> Select a template and make changes according to your preference. </Typography>
        <Divider />
        <TemplateSelector onSelectTemplate={handleTemplateSelect} />
      </div>
      <Divider />
      <TextField
        label="Name of Article"
        variant="outlined"
        value={articleName}
        onChange={(e) => setArticleName(e.target.value)}
        fullWidth
        margin="normal"
        sx={{
          backgroundColor: "white",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: (theme) => theme.palette.primary.main,
            },
            "&:hover fieldset": {
              borderColor: (theme) => theme.palette.primary.main,
            },
            "&.Mui-focused fieldset": {
              borderColor: (theme) => theme.palette.primary.main,
            },
            "& .MuiInputBase-input": {
              color: (theme) => theme.palette.primary.dark,
              fontWeight: "bold",
            },
          },
          "& .MuiInputLabel-root": {
            color: (theme) => theme.palette.primary.main,
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: (theme) => theme.palette.primary.main,
          },
        }}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="domain-label">Article Domain</InputLabel>
        <Select
          labelId="domain-label"
          id="domain-select"
          value={selectedDomain}
          label="Article Domain"
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          {domains.map((domain) => (
            <MenuItem key={domain._id} value={domain.topicDomainName}>
              {domain.topicDomainName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />
      <br />

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Article
          </Button>{" "}
          <Button variant="contained" color="secondary" onClick={handleSaveAsDraft}>
            Save As Draft
          </Button>
        </>
      )}
      <br />
      <br />
      {typeof window !== "undefined" && (
        <ReactQuill
          value={text}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          style={{ height: "530px", width: "1000px" }}
        />
      )}
    </div>
  );
};

export default TextEditor;
