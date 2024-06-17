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
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import urls from "../enums/url";
import axios from "axios";
import AdminContex from "../contex/adminContex";
import { set } from "react-hook-form";

export default function CustomNotificationIcon() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const adminContex = React.useContext(AdminContex);
  const [notifications, setNotifications] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsRead = async (id) => {
    try {
      await axios.patch(`${urls.BASE_URL_NOTIFICATION}mark/${id}`);
      const newNotifications = notifications.filter(
        (notification) => notification.notificationId !== id
      );
      setNotifications(newNotifications);
    } catch (error) {
      console.log(error);
    }
  };

  let config;

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${urls.BASE_URL_NOTIFICATION}get`);
        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    // if (config)
    fetchNotifications();
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Notifications" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Badge color="secondary" badgeContent={notifications.length}>
              <NotificationsIcon sx={{ color: "white" }} />
            </Badge>
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
        {notifications.map((notification) => (
          <MenuItem
            key={notification._id}
            sx={{ padding: "10px", display: "block" }}
            onClick={() => markAsRead(notification.notificationId)}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "600" }}>
              {notification.title}
            </Typography>
            <Typography variant="caption" align="right">
              {new Date(notification.savedAt).toLocaleDateString()}{" "}
              {new Date(notification.savedAt).toLocaleTimeString()}
            </Typography>
            <Divider />
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
