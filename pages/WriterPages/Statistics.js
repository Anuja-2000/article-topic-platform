import ArticlesCard from "../../components/article/writer/ArticlesCardStats";

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
import { Blocks } from "react-loader-spinner";
//import loader.css
import "../../styles/loader.module.css";

function Stats() {
  const [articles, setArticles] = useState([]);
  const [userid, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          `http://localhost:3001/api/article/writer/${userid}`
        );

        if (response.data && response.data.success) {
          const filteredArticles = response.data.articles.filter(
            (article) => article.savedType === "saved"
          );

          console.log("Filtered articles: ", filteredArticles);

          setArticles(
            filteredArticles.map((article, index) => ({
              id: article.articleId,
              createdAt: new Date(article.createdAt).toLocaleDateString(),
              likes: article.likes,
              viewCount: article.viewCount,
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
        ) : (
          <>
            <h1>Statistics</h1>
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
                  <h2>© Published Articles</h2>
                  {articles.map((article) => (
                    <ArticlesCard
                      article={article}
                      key={article.id}
                    />
                  ))}
                </Stack>
              </Container>
            </Box>
            {/* Render ArticlePopup component */}
            
          </>
        )}
      </Navbar>
    </div>
  );
}
export default Stats;
