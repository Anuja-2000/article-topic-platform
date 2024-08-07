"use client"
import * as React from 'react';
import { useState, useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AvatarIcon from '../components/avatar';
import CustomNotificationIcon from "../components/customNotificationIcon";
import Tooltip from '@mui/material/Tooltip';
import ReportIcon from '@mui/icons-material/Report';


import { useRouter } from 'next/router';
import Link from 'next/link';

import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import TopicIcon from '@mui/icons-material/Topic';
import ArticleIcon from '@mui/icons-material/Article';
import FlagIcon from '@mui/icons-material/Flag';
import GroupIcon from '@mui/icons-material/Group';
import CheckIcon from '@mui/icons-material/Check';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GradingIcon from '@mui/icons-material/Grading';
import DomainIcon from '@mui/icons-material/Domain';
import AdminContext from '../contex/adminContex';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Navbar({children}) {

    const iconMap = {
        'Dashboard': < DashboardIcon sx={{ color: 'white' }} />,
        'Topic Domains': <CreateIcon sx={{ color: 'white' }} />,
        'Keywords': <TopicIcon sx={{ color: 'white' }} />,
        'Topics': < ArticleIcon sx={{ color: 'white' }} />,
        'Flagged Topics': <FlagIcon sx={{ color: 'white' }} />,
        'Approve Articles': <GradingIcon sx={{ color: 'white' }} />,
        'Deactivate Articles': <ReportIcon sx={{ color: 'white' }} />,
        'Deactivate Writers': <CheckIcon sx={{ color: 'white' }} />,
        'User Roles': <GroupIcon sx={{ color: 'white' }} />,
        'Reports': <AssessmentIcon sx={{ color: 'white' }} />,
        'Article Domains': <DomainIcon sx={{ color: 'white' }} />,
      };
    const router = useRouter();
const [selectedIndex, setSelectedIndex] = useState(0);


useEffect(() => {
  // Update the selected index whenever the route changes
  const path = router.pathname;
  const index = ['Dashboard', 'TopicDomains', 'Keywords','Topics', 'Flagged Topics', 'ApproveArticles','DeactivateArticles', 'DeactivateWriters', 'UserRoles', 'Reports', 'ArticleDomains'].findIndex((text) => path.includes(text.replace(' ', '')));
  setSelectedIndex(index);
}, [router.pathname]); //only be executed if router.pathname changes between renders.


const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };


  const theme = useTheme();
  const adminContext = React.useContext(AdminContext);
  const [open, setOpen] = React.useState(adminContext.drawerOpen || false); 


  const handleDrawerOpen = () => {
    adminContext.addDrawerOpen(true);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    adminContext.addDrawerOpen(false);
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{display:'flex'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'primary.light',
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
              paddingLeft: '10px'
            }}>
            GATE
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton
            size="large"
            color="inherit"
            aria-label="search"
            onClick={() => router.push('/view-contact-us-messages')}
          >
            <Tooltip title="View Messages" arrow>
            < MailIcon  />
            </Tooltip>
          </IconButton>
            <CustomNotificationIcon/>
            <AvatarIcon/>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} PaperProps={{sx: {backgroundColor: "primary.main"}}}>  
        <DrawerHeader sx={{backgroundColor:"primary.main"}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Topic Domains', 'Keywords','Topics', 'Flagged Topics', 'Approve Articles', 'Deactivate Articles', 'Deactivate Writers', 'User Roles', 'Reports' , 'Article Domains'].map((text, index) => (
            <ListItem key={text} disablePadding  sx = {{display: 'block',':hover':{backgroundColor:'primary.dark'}}}>
              <Link href={`/AdminPages/${text.replace(' ', '')}`} passHref>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                  sx={{
                    color: 'primary.main',
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    ':hover': {
                      color: 'white',
                      backgroundColor: 'primary.dark',
                      '& .MuiSvgIcon-root': {
                        color: 'white',
                      },
                    },
                }}
                >
                  <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                  >
                    {iconMap[text]}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{color:"primary.contrastText", opacity: open ? 1 : 0 }}/>

                </ListItemButton>

              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
