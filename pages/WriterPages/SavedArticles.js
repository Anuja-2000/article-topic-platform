import ArticlesCard from "../../components/article/writer/ArticlesCard";
import ArticlePopup from "../../components/article/writer/ArticlePopup";
import { ARTICLE_ROUTES } from "../../public/constants/routes";

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

function SavedArticles() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(ARTICLE_ROUTES.FIND);
        if (response.data && response.data.success) {
          setArticles(
            response.data.articles.map((article, index) => ({
              id: article._id,
              createdAt: new Date(article.createdAt).toLocaleDateString(),
              updatedAt: new Date(article.updatedAt).toLocaleDateString(),
              description: article.content,
              logo: article.coverImage || "https://picsum.photos/600/600", // Use cover image or a random image
              title: article.title,
              coverImage: `https://picsum.photos/500/300?random=${index}`,
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

    fetchArticles();
  }, []);

  return (
    <div>
      <Navbar>
        <h1>Saved Articles</h1>
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
              {articles.map((article) => (
                console.log(article),
                <ArticlesCard
                  article={article}
                  key={article.id}
                  onClick={() => handleArticleClick(article)} // Pass onClick handler
                />
              ))}
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

export default SavedArticles;
