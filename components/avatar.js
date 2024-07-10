import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Link from "next/link";

export default function AvatarIcon() {
  const[userType, setUserType] = React.useState(" ");
  const [username, setUsername] = React.useState(" ");
  const [imgUrl, setImgUrl] = React.useState(" ");

  React.useEffect(() => {
    const name = localStorage.getItem("username");
    if (name != null) {
      setUserType(localStorage.getItem("type"));
      setUsername(name);
    } else {
      setUsername("!user");
    }

    setImgUrl(localStorage.getItem("imgUrl"));
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("imgUrl");

    window.location.href = "/login";
  };

  const viewProfile = () => {
    if(userType === "Admin"){
      window.location.href = "/AdminPages/profile";
    }else if (userType === "Reader"){
      window.location.href = "/reader/profile";
    }else if (userType === "Writer"){
      window.location.href = "/writer/profile";
    }
  };

  const viewSettings = () => {
    if(userType === "Admin"){
      window.location.href = "/AdminPages/settings";
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 32, height: 32, bgcolor: "darkblue" }}
              src={imgUrl!=""? imgUrl:"/path/to/profile.jpg"}
            >
              {username.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={viewProfile}>
          <Avatar alt={username!==null ?username.toUpperCase():"User"} 
                src={imgUrl!=""? imgUrl:"/path/to/profile.jpg"} 
          /> 
          Profile
        </MenuItem>
        <Divider />
        { userType!="Reader" && <MenuItem onClick={viewSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>}
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
