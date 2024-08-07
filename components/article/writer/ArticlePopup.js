import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import SendIcon from '@mui/icons-material/Send';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
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

  const handleEdit = () => {
    router.push({
      pathname: "/WriterPages/EditArticle",
      query: {
        article: JSON.stringify(article),
      },
    });
  };

  const handleMoveToTrash = (article) => {
    setAlertConfig({
      title: "Move to Trash?",
      description:
        "Are you sure you want to move this article to trash? You can restore it within 30 days, after which it will be deleted automatically.",
      onConfirm: async () => {
        setAlertOpen(false);
        handleClose();
        const articledata = {
          articleId: article.id,
          savedType: "trashed",
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
          alert("Article moved to trash!");
          window.location.reload();
        } catch (error) {
          console.error("Error saving article:", error);
          alert(
            "Failed to save article. Please check your network and try again."
          );
        }
      },
    });
    setAlertOpen(true);
  };

  const handleSendToAdmin = async (article) => {
    console.log("Article in popup: ", article);

    const articledata = {
      articleId: article.id,
      status: "pending",
    };

    console.log("Article data: ", articledata);

    try {
      const response = await axios.patch(
        `http://localhost:3001/api/article/update/status`,
        articledata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from server:", response);
      alert("Article sent for admin approval");
      window.location.reload();
    } catch (error) {
      console.error("Error updating article:", error);
      alert(
        "Failed to update article. Please check your network and try again."
      );
    }
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
          <MenuItem onClick={handleEdit} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
          <MenuItem onClick={() => handleMoveToTrash(article)} disableRipple>
            <DeleteIcon />
            Move to Trash
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={() => handleSendToAdmin(article)} disableRipple>
            <SendIcon />
            Send to Admin
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
