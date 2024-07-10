import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const ArticlesCard = ({ article, onClick }) => {
  return (
    <Card onClick={onClick} style={{ cursor: "pointer" }}>
      <CardContent>
        {/* Article Title */}
        <Box
          mb={2}
          p={2}
          style={{ backgroundColor: "#2196f3", color: "white", textAlign: "center" }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            style={{ fontWeight: "bold" }}
          >
            {article.title}
          </Typography>
        </Box>

        {/* Cover Image */}
        <Box
          mb={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          <img
            src={
              article.coverImage ||
              "https://i.ibb.co/DbhGj0C/Copy-of-204069-D-Vehicle-crash-prediction-and-prevention-systems-using-Artificial-Intelligence.png"
            }
            alt={article.title}
            style={{ width: "70%", height: "auto" }}
          />
        </Box>

        {/* Created At */}
        <Typography variant="body2" color="text.secondary" style={{ textAlign: "center" }}>
          Created At: {article.createdAt}
        </Typography>
        
        {/* Status */}
        <Typography variant="body2" color="text.secondary" style={{ textAlign: "center" }}>
          Status: {article.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArticlesCard;
