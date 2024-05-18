import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from '@mui/icons-material/Send';

import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Box mb={1}></Box>

        <Button
          id="demo-customized-button"
          aria-controls={open2 ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open2 ? "true" : undefined}
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
          open={open2}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <EditIcon />
            Edit
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <DeleteIcon />
            Move to Trash
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <FileCopyIcon />
            Duplicate
          </MenuItem>
          <Divider sx={{ my: 0.5 }} />
           <MenuItem onClick={handleClose} disableRipple>
           <FileCopyIcon />
            Send to Admin
          </MenuItem>
        </StyledMenu>
      </DialogContent>
    </Dialog>
  );
};

export default ArticlePopup;
