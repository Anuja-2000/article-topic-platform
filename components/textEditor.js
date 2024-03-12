import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import styles from "../styles/EditingArea.module.css";
import { ARTICLE_ROUTES } from "../public/constants/routes";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = () => {
  const [text, setText] = useState("");
  const [articleName, setArticleName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    if (!userId) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const quillStyle = document.createElement("link");
    quillStyle.href = "https://cdn.quilljs.com/1.3.6/quill.snow.css";
    quillStyle.rel = "stylesheet";
    quillStyle.type = "text/css";
    document.querySelector("head").appendChild(quillStyle);
  }, []);

  const handleChange = (value) => {
    setText(value);
    console.log(value);
  };

  const handleSave = () => {
    const articleId = articleName + "-" + uuidv4();
    const articleData = {
      articleId: articleId,
      userId: userId,
      title: articleName,
      content: text,
      savedType: "draft",
    };

    const config = {
      method: "post",
      url: ARTICLE_ROUTES.CREATE,
      headers: {
        "Content-Type": "application/json",
      },
      data: articleData,
    };

    console.log(articleData);

    axios(config)
      .then((response) => {
        console.log(response.data);
        alert("Success", "Article saved successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed", error.message);
      });
  };

  const handleArticleNameChange = (e) => {
    setArticleName(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 500; // Maximum width for resizing
        let newWidth = img.width;
        let newHeight = img.height;

        if (img.width > maxWidth) {
          newWidth = maxWidth;
          newHeight = (img.height * maxWidth) / img.width;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const resizedDataURL = canvas.toDataURL(file.type);
        const resizedImg = `<img src="${resizedDataURL}" alt="Uploaded Image" />`;
        const updatedText = text + resizedImg;
        setText(updatedText);
      };
    };

    reader.readAsDataURL(file);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }],
      [{ script: "super" }, { script: "sub" }],
      ["link", "image", "video"],
      ["clean"],
    ],
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
    "color",
    "background",
    "script",
    "link",
    "image",
    "video",
    "formula",
    "list",
  ];

  const editorStyle = {
    height: "530px", //height of cursor area
    width: "1000px",
  };

  return (
    <div className={styles.textEditorArea}>
      <input
        type="text"
        placeholder="Name of Article"
        value={articleName}
        onChange={handleArticleNameChange}
        className={styles.articleNameInput} // Apply a CSS class to style the input field
      />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Article
      </Button>
      {" "}{" "}{" "}
      <Button variant="contained" color="secondary" onClick={()=>{}}>
        Save AS DRAFT
      </Button>{" "}
      {/* Apply a CSS class to style the button */}
      <br />
      <br />
      {typeof window !== "undefined" && (
        <ReactQuill
          value={text}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          style={editorStyle}
        />
      )}
    </div>
  );
};

export default TextEditor;
