
//Permanent drawer
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as React from 'react';

//MUI components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreateIcon from '@mui/icons-material/Create';
import TopicIcon from '@mui/icons-material/Topic';
import ArticleIcon from '@mui/icons-material/Article';
import FlagIcon from '@mui/icons-material/Flag';
import GroupIcon from '@mui/icons-material/Group';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




const drawerWidth = 220;  //width for the drawer we can change this
const AppBarWidth = 64;
const iconMap = {
  'Dashboard': < DashboardIcon sx={{ color: 'white' }} />,
  'Templates': <CreateIcon sx={{ color: 'white' }} />,
  'Topic Domains': <TopicIcon sx={{ color: 'white' }} />,
  'Article Types': < ArticleIcon sx={{ color: 'white' }} />,
  'Flagged Topics': <FlagIcon sx={{ color: 'white' }} />,
  'User Roles': <GroupIcon sx={{ color: 'white' }} />,
  'Generate Reports': <CheckIcon sx={{ color: 'white' }} />
};

export default function NavBar() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    // Update the selected index whenever the route changes
    const path = router.pathname;
    const index = ['Dashboard', 'Templates', 'Topic Domains','Article Types',  'Flagged Topics', 'User Roles', 'Generate Reports'].findIndex((text) => path.includes(text.replace(' ', '')));
    setSelectedIndex(index);
  }, [router.pathname]); //only be executed if router.pathname changes between renders.

  useEffect(()=>{
          selectedIndex
}
)
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#3934a1'
          //width:`calc(100% - ${drawerWidth}px)`,
          // ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>

          <Typography variant="h6" noWrap component="div"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#9399f7',
              textDecoration: 'none',
            }}>
            Admin
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
            LOGO
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton
            size="large"
            color="inherit"
            aria-label="search"
          >
            < MailIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            aria-label="notifications"
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            size="large"
            color="inherit"
            aria-label="account"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: `calc(${AppBarWidth}px)`, //marginTop:'64px',
            backgroundColor: '#060552'
          },
        }}
        variant="permanent"  // making drawer permanent
        anchor="left"   //drawer to left
      >




<List sx={{ overflow: 'hidden' }}>
          {['Dashboard', 'Templates','Topic Domains', 'Article Types',  'Flagged Topics', 'User Roles', 'Generate Reports'].map((text, index) => (
            <ListItem key={text}>
              <Link href={`/AdminPages/${text.replace(' ', '')}`} passHref>
                <ListItemButton
                  selected={selectedIndex === index}
                  onClick={(event) => handleListItemClick(event, index)}
                  sx={{
                    color: 'white',
                    padding: '8px 1px',
                    width: drawerWidth,
                    ':hover': {
                      color: 'inherit',
                      backgroundColor: '#5f71f3',
                      '& .MuiSvgIcon-root': {
                        color: 'black',
                      },
                    },
                  }}
                >
                  <ListItemIcon>
                    {iconMap[text]}
                  </ListItemIcon>
                  <ListItemText primary={text} />

                </ListItemButton>

              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}



