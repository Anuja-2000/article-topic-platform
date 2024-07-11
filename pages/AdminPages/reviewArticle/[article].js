// pages/article/[article].js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Button, Typography, Box, Stack } from "@mui/material"; // Updated import
import ArticleBody from "../../../components/article/ArticleBody";
import styles from "../../../styles/article.module.css";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import url from "../../../enums/url";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Skeleton from "@mui/material/Skeleton";

const reviewArticlePage = () => {
  const router = useRouter();
  const [articleData, setArticleData] = useState([]);
  const articleId = router.query.article ?? null;

  const [approveOpen, setApproveOpen] = React.useState(false);
  const [rejectOpen, setRejectOpen] = React.useState(false);

  const handleApproveOpen = () => {
    setApproveOpen(true);
  };

  const handleApproveClose = () => {
    setApproveOpen(false);
  };

  const handleRejectOpen = () => {
    setRejectOpen(true);
  };

  const handleRejectClose = () => {
    setRejectOpen(false);
  };

  const updateArticle = async (status) => {
    handleApproveClose();
    try {
      const response = await axios.patch(
        `${url.BASE_URL_ARTICLE}/update/status`,
        {
          articleId: articleId,
          status: status,
        }
      );
      if (response.data.success === true && response.status === 200) {
        const response = await axios.post(`${url.BASE_URL_APPROVAL}save`, {
          articleId: articleId,
          adminId: localStorage.getItem("userId"),
          status: status,
        });
        if (response.status === 201) {
          alert("Article " + status + " successfully");
          router.push("/AdminPages/ApproveArticles");
        }
      } else {
        alert("Article " + status + " failed");
      }
      console.log(response);
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!articleId) return;
      try {
        const response = await axios.get(`${url.BASE_URL_ARTICLE}${articleId}`);
        const jsonData = response.data.article;
        setArticleData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [articleId]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar>
      <Container component="main" maxWidth="lg">
        {articleData.length != 0 ? (
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" color="primary">
              {articleData.title}
            </Typography>
            <Typography variant="h6" color="primary.dark">
              Last updated : {new Date(articleData.updatedAt).toDateString()}
            </Typography>
          </Box>
        ) : (
          <Box display="flex" justifyContent="space-between">
            <Skeleton variant="text" width={400} height={60} />
            <Skeleton variant="text" width={400} height={40} />
          </Box>

        )}

        <div className={styles.imageContainer}>
          {articleData.length != 0 ? (
            <Image
              src={`${articleData.coverImage != null?(articleData.coverImage):""}`}
              alt="Article Image"
              width={1000}
              height={500}
              style={{ borderRadius: "10px" }}
            />
          ) : (
            <Skeleton variant="rectangular" width={1000} height={500} />
          )}
        </div>
        {articleData.length != 0 ? (
          <ArticleBody content={articleData.content} className={styles.content} />
        ) : (
          <Skeleton variant="text" width={1000} height={500} />
        )}

        {articleData.length != 0 ? (
          <Box display="flex" justifyContent="end">
            <Stack direction="row" spacing={2}>
              <Button
                varient="outlined"
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  ":hover": { color: "green" },
                }}
                onClick={handleApproveOpen}
              >
                Approve
              </Button>
              <Button
                varient="outlined"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  ":hover": { color: "red" },
                }}
                onClick={handleRejectOpen}
              >
                Reject
              </Button>
            </Stack>
          </Box>
        ) : (
          <Box display="flex" justifyContent="end">
            <Stack direction="row" spacing={2}>
              <Skeleton variant="rectangular" width={100} height={40} />
              <Skeleton variant="rectangular" width={100} height={40} />
            </Stack>
          </Box>
        )}

        <React.Fragment>
          <Dialog open={approveOpen} onClose={handleApproveClose}>
            <DialogTitle>Approve Article</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to approve this article to publish?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleApproveClose}>Cancel</Button>
              <Button
                type="submit"
                color="success"
                variant="contained"
                onClick={() => {
                  updateArticle("approved");
                }}
              >
                Approve
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>

        <React.Fragment>
          <Dialog open={rejectOpen} onClose={handleRejectClose}>
            <DialogTitle>Reject Article</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to Reject this article to publish?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRejectClose}>Cancel</Button>
              <Button
                type="submit"
                color="error"
                variant="contained"
                onClick={() => {
                  updateArticle("rejected");
                }}
              >
                Reject
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </Container>
    </Navbar>
  );
};

export default reviewArticlePage;
