import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";

const ArticlesCard = ({ article, onClick }) => {
  return (
    <Card onClick={onClick} style={{ cursor: "pointer" }}>
      <CardContent>
        {/* Cover Image */}
        <Box mb={2}>
          {/* Article Title */}
          <Typography gutterBottom variant="h6" component="div">
            {article.title}
          </Typography>
          <img
            src={article.coverImage}
            alt={article.title}
            style={{ width: "70%", height: "auto" }}
          />
        </Box>
        {/* Created At */}
        <Typography variant="body2" color="text.secondary">
          Created At: {article.createdAt}
        </Typography>
        {/* Status */}
        <Typography variant="body2" color="text.secondary">
          Status: {article.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArticlesCard;
