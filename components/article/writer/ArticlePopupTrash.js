import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import RestoreIcon from '@mui/icons-material/Restore';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import AlertDialog from "../../..//pages/WriterPages/AlertDialog";
import { useRouter } from "next/router";
import axios from "axios";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ArticlePopup = ({ article, open, onClose }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    description: "",
    onConfirm: null,
  });

  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoveToSaved = (article) => {
    setAlertConfig({
      title: "Move to Saved?",
      description: "Are you sure you want to move this article to Saved?",
      onConfirm: async () => {
        setAlertOpen(false);
        handleClose();
        const articledata = {
          articleId: article.id,
          savedType: "saved",
        };

        console.log("Article data: ", articledata);

        try {
          const response = await axios.patch(
            `http://localhost:3001/api/article/update/savedType`,
            articledata,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Response from server:", response);
          alert("Article moved successfully!");
          window.location.reload();
        } catch (error) {
          console.error("Error saving article:", error);
          alert(
            "Failed to move article. Please check your network and try again."
          );
        }
      },
    });
    setAlertOpen(true);
  };

  const handleMoveToDraft = (article) => {
    setAlertConfig({
      title: "Move to Draft?",
      description: "Are you sure you want to move this article to draft?.",
      onConfirm: async () => {
        setAlertOpen(false);
        handleClose();
        const articledata = {
          articleId: article.id,
          savedType: "draft",
        };

        console.log("Article data MoveToDraft: ", articledata);

        try {
          const response = await axios.patch(
            `http://localhost:3001/api/article/update/savedType`,
            articledata,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Response from server:", response);
          alert("Article moved successfully!");
          window.location.reload();
        } catch (error) {
          console.error("Error saving article:", error);
          alert(
            "Failed to move article. Please check your network and try again."
          );
        }
      },
    });
    setAlertOpen(true);
  };

  const DeleteArticle = (article) => {
    setAlertConfig({
      title: "Delete Permenently?",
      description: "Are you sure you want to delete this article permently?",
      onConfirm: async () => {
        setAlertOpen(false);
        handleClose();
        const articledata = {
          articleId: article.id,
          savedType: "deleted",
        };

        console.log("Article data deleted: ", articledata);

        try {
          const response = await axios.patch(
            `http://localhost:3001/api/article/update/savedType`,
            articledata,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Response from server:", response);
          alert("Article Deleted!");
          window.location.reload();
        } catch (error) {
          console.error("Error saving article:", error);
          alert(
            "Failed to delete article. Please check your network and try again."
          );
        }
      },
    });
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  if (!article) {
    return null;
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
          src={
            article.coverImage ||
            "https://i.ibb.co/DbhGj0C/Copy-of-204069-D-Vehicle-crash-prediction-and-prevention-systems-using-Artificial-Intelligence.png"
          }
          alt={article.title}
          style={{ width: "100%", height: "auto" }}
        />
        <Typography
          dangerouslySetInnerHTML={createMarkup(article.description)}
        />
        <Typography variant="body2" color="text.secondary">
          Created At: {article.createdAt}
        </Typography>
        <Box mb={1}></Box>

        <Button
          id="demo-customized-button"
          aria-controls={openMenu ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Options
        </Button>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMoveToDraft(article)} disableRipple>
            <RestoreIcon />
            Restore as draft
          </MenuItem>
          <MenuItem onClick={() => handleMoveToSaved(article)} disableRipple>
            <ModelTrainingIcon />
            Restore as saved
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={() => DeleteArticle(article)} disableRipple>
            <DeleteIcon />
            Delete Permenently
          </MenuItem>
        </StyledMenu>
      </DialogContent>
      <AlertDialog
        open={alertOpen}
        onClose={handleAlertClose}
        onConfirm={alertConfig.onConfirm}
        title={alertConfig.title}
        description={alertConfig.description}
      />
    </Dialog>
  );
};

export default ArticlePopup;
