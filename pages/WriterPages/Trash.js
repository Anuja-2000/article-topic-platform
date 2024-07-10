import ArticlesCard from "../../components/article/writer/ArticlesCard";
import ArticlePopup from "../../components/article/writer/ArticlePopup";

import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/createArticleNavbar";

function Trash() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userid, setUserId] = useState(null);
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    console.log("User ID: ", userId);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        if (!userid) {
          console.error("User ID is not defined.");
          return;
        }

        const response = await axios.get(
          `https://article-writing-backend.onrender.com/api/article/writer/${userid}`
        );

        console.log("Response: ", response.data);

        if (response.data && response.data.success) {

          const filteredArticles = response.data.articles.filter(
            (article) => article.savedType === "trashed"
          );

          setArticles(
            filteredArticles.map((article, index) => ({
              id: article._id,
              createdAt: new Date(article.createdAt).toLocaleDateString(),
              updatedAt: new Date(article.updatedAt).toLocaleDateString(),
              description: article.content,
              logo: article.coverImage || "https://picsum.photos/600/600", // Use cover image or a random image
              title: article.title,
              coverImage: article.coverImage,
              status: article.status,
            }))
          );
        } else {
          console.error("Failed to fetch articles: ", response.data);
        }
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };

    if (userid) {
      fetchArticles();
    }
  }, [userid]);

  return (
    <div>
      <Navbar>
        <h1>Trash</h1>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              ></Stack>
              {/* Grid content */}
              {articles.map(
                (article) => (
                  console.log(article),
                  (
                    <ArticlesCard
                      article={article}
                      key={article.id}
                      onClick={() => handleArticleClick(article)} // Pass onClick handler
                    />
                  )
                )
              )}
            </Stack>
          </Container>
        </Box>
        {/* Render ArticlePopup component */}
        <ArticlePopup
          article={selectedArticle}
          open={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      </Navbar>
    </div>
  );
}

export default Trash;
