import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import styles from "../styles/EditingArea.module.css";
import { ARTICLE_ROUTES } from "../public/constants/routes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ArticleCoverImageUploader from './ArticleCoverImageUploader';
import ImageUploader from "./ImageUploader";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = () => {
  const [text, setText] = useState("");
  const [articleName, setArticleName] = useState("");
  const [userId, setUserId] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    if (!userId) {
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (value) => {
    setText(value);
  };

  const handleSave = () => {
    const articleId = articleName + "-" + uuidv4();
    const articleData = {
      articleId: articleId,
      userId: userId,
      title: articleName,
      content: text,
      images: images.map((img) => img.url),
      savedType: "saved",
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
        alert("Article saved successfully");
        window.location.reload();
      })
      .catch((error) => {
        alert("Failed to save article: " + error.message);
      });
  };

  const handleSaveAsDraft = () => {
    const articleId = articleName + "-" + uuidv4();
    const articleData = {
      articleId: articleId,
      userId: userId,
      title: articleName,
      content: text,
      images: images.map((img) => img.url),
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

    axios(config)
      .then((response) => {
        alert("Draft saved successfully");
      })
      .catch((error) => {
        alert("Failed to save draft: " + error.message);
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
      <ArticleCoverImageUploader />
      <ImageUploader onImagesChange={setImages} />
      <input
        type="text"
        placeholder="Name of Article"
        value={articleName}
        onChange={(e) => setArticleName(e.target.value)}
        className={styles.articleNameInput}
      />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Article
      </Button>{" "}
      <Button variant="contained" color="secondary" onClick={handleSaveAsDraft}>
        Save As Draft
      </Button>{" "}
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
