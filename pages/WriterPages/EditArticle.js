import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";
import styles from "../../styles/EditingArea.module.css";
import { ARTICLE_ROUTES } from "../../public/constants/routes";
import Navbar from "../../components/createArticleNavbar";
import { useRouter } from "next/router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = () => {
  const router = useRouter();
  const { article } = router.query;
  const parsedArticle = article ? JSON.parse(article) : {};

  const [text, setText] = useState(parsedArticle.description || "");
  const [articleName, setArticleName] = useState(parsedArticle.title || "");
  const [coverImage, setCoverImage] = useState(
    parsedArticle.coverImage || null
  );
  const [articleId, setArticleId] = useState(parsedArticle.id || "");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  const handleChange = (value) => {
    setText(value);
  };

  const handleUpdate = () => {
    const articleData = {
      userId: userId,
      title: articleName,
      content: text,
    };

    console.log("Article Data in edit: ", articleData);

    const config = {
      method: "patch",
      url: ARTICLE_ROUTES.UPDATE(articleId),
      headers: {
        "Content-Type": "application/json",
      },
      data: articleData,
    };

    axios(config)
      .then((response) => {
        alert("Article updated successfully");
        console.log("Article response: ", response.data);

        // router back
        router.back();
      })
      .catch((error) => {
        alert("Failed to save article: " + error.message);
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
    <div>
      <Navbar>
        <div className={styles.textEditorArea}>
          <img
            src={coverImage}
            alt="Cover Image"
            style={{ width: "15%", height: "15%" }}
          />
          <br />
          <input
            type="text"
            placeholder="Name of Article"
            value={articleName}
            onChange={(e) => setArticleName(e.target.value)}
            className={styles.articleNameInput}
          />
          <br />
          <br />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Article
          </Button>{" "}
          <br />
          <br />
          <Box display="flex" alignItems="center" justifyContent="center">
            {typeof window !== "undefined" && (
              <ReactQuill
                value={text}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{ height: "530px", width: "1000px" }}
              />
            )}
          </Box>
        </div>
      </Navbar>
    </div>
  );
};

export default TextEditor;
