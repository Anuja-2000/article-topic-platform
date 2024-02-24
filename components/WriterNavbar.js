import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    Button,
    Popover,
    List,
    ListItem,
    Menu,
    MenuItem,

} from '@mui/material';
import TopicIcon from '@mui/icons-material/Topic';
import Link from 'next/link';

import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([
        { message: 'New message 1', read: false },
        { message: 'New message 2', read: true },
        { message: 'New message 3', read: false },
    ]);
    const router = useRouter();

    const handleClickTopicSuggestion = () => {
        router.push('/userTopicSuggestion');
    };
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
        <AppBar position="fixed" style={{ width: '100%' }} sx={{ backgroundColor: '#f5f5f5', color: 'black' }}>
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

                <Button onClick={handleClickTopicSuggestion} color="inherit" sx={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center',borderRadius:6,marginLeft:13,fontSize:20,textTransform: 'none', fontFamily:'Ubuntu'}} >
                    <TopicIcon sx={{ marginRight: '5px' }} />
                    <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none' }}>Topic Suggestion</Typography>
                </Button>
                {/* Notifications Icon with Badge */}
                <Button color="inherit" onClick={handleNotificationClick} >
                    <Badge badgeContent={unreadNotifications} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </Button>

                {/* User Icon and Menu */}
                <IconButton color="inherit" onClick={handleUserIconClick}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    anchorEl={userMenuAnchorEl}
                    open={Boolean(userMenuAnchorEl)}
                    onClose={handleUserMenuClose}
                >
                    <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
                    <MenuItem onClick={handleUserMenuClose}>
                        <Link href="/login" passHref>
                        Logout
                        </Link>
                        </MenuItem>
                </Menu>

                {/* Notifications Popover */}
                <Popover
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
                </Popover>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
