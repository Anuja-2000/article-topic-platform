
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
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AvatarIcon from '../components/avatar';
import CustomNotificationIcon from "../components/customNotificationIcon";
import MenuIcon from '@mui/icons-material/Menu';
import {handleDrawerOpen,open} from '../components/customDrawer';
import MiniDrawer from "../components/customDrawer";


const drawerWidth = 220;  //width for the drawer we can change this
const AppBarWidth = 64;


export default function NavBar() {
  const router = useRouter();


  return (
    <Box sx={{ display: 'flex' }}>
      
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "primary.main"
          //width:`calc(100% - ${drawerWidth}px)`,
          // ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
        
          
          <div style={{ flexGrow: 1 }}></div>
          <IconButton
            size="large"
            color="inherit"
            aria-label="search"
            onClick={() => router.push('/view-contact-us-messages')}
          >
            < MailIcon  />
          </IconButton>
            <CustomNotificationIcon/>
            <AvatarIcon/>
        </Toolbar>
      </AppBar>

      <Toolbar />
            <MiniDrawer/>
{/* 
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
          {['Dashboard', 'Templates','Topic Domains', 'Article Types',  'Flagged Topics', 'User Roles'].map((text, index) => (
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
      </Drawer> */}
    </Box>
  );
}



