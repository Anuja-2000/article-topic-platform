// ArticlePopup.js

import React from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

const ArticlePopup = ({ article, open, onClose }) => {
  if (!article) {
    return null; // Return null if article is null
  }

  // Define the createMarkup function inside the component
  const createMarkup = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{article.title}</DialogTitle>
      <DialogContent>
        {/* Status */}
        <Typography variant="body2" color="text.secondary">
          Status: {article.status}
        </Typography>
        <img
          src={article.coverImage}
          alt={article.title}
          style={{ width: "100%", height: "auto" }}
        />
        <Typography
          dangerouslySetInnerHTML={createMarkup(article.description)}
        />
        <Typography variant="body2" color="text.secondary">
          Created At: {article.createdAt}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ArticlePopup;
