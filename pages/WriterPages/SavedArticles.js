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
import { Blocks } from 'react-loader-spinner';
//import loader.css
import '../../styles/loader.module.css';
import urls from "../../enums/url";

function SavedArticles() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userid, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
          `${urls.BASE_URL_ARTICLE}writer/${userid}`
        );

        console.log("Response: ", response.data);

        if (response.data && response.data.success) {

          const filteredArticles = response.data.articles.filter(
            (article) => article.savedType === "saved"
          );

          setArticles(
            filteredArticles.map((article, index) => ({
              id: article._id,
              createdAt: new Date(article.createdAt).toLocaleDateString(),

              updatedAt: new Date(article.updatedAt).toLocaleDateString(),
              description: article.content,
              logo: article.coverImage || "https://picsum.photos/600/600", // Random image for cover 
              title: article.title,
              coverImage: article.coverImage,
              status: article.status,
            }))
          );
          setIsLoading(false);
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

        {isLoading ? (
          <Stack alignItems="center">
            <Blocks
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
            </Stack>
        ) :
        <>
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
        </>
        }
      </Navbar>
    </div>
  );
}

export default SavedArticles;
