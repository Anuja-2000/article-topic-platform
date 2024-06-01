import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Button,
  Popover,
  List,
  ListItem,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AvatarIcon from '../avatar'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState("");
  const [notifications, setNotifications] = useState([
    { message: 'New message 1', read: false },
    { message: 'New message 2', read: true },
    { message: 'New message 3', read: false },
  ]);
  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    console.log(username);
  });

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // User Menu
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const handleUserIconClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  // Count unread notifications
  const unreadNotifications = notifications.filter((notification) => !notification.read).length;

  return (
    <AppBar position="fixed" style={{ width: '100%' }}>
      <Toolbar>
        
        <Typography variant="h6" noWrap component="div"
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#9399f7',
                            textDecoration: 'none',
                          }}>
                          Writer
        </Typography>
        <Typography variant="h6" noWrap component="div"
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            paddingLeft: '10px',
                            flexGrow: 1
                          }}>
                          GATE
        </Typography>
                   
       

        {/* Notifications Icon with Badge */}
        {username!==null && <Button color="inherit" onClick={handleNotificationClick}>
          <Badge badgeContent={unreadNotifications} color="secondary">
            <NotificationsIcon />
          </Badge>
        </Button>}
        {username!==null && <AvatarIcon />}
       
        {/* Notifications Popover */}
        {username!==null && <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index} sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                {notification.message}
              </ListItem>
            ))}
          </List>
        </Popover>}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
