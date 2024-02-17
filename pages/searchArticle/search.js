import React, { useState } from 'react';
import style from "../../styles/search.module.css";
import Head from "next/head"
import {Box, TextField, IconButton, InputAdornment} from '@mui/material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import SearchArticleBox from './searchArticleBox';
import NavBar from '../../components/Navbar';
import { AppBar, Toolbar, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../../components/navbarReader/Navbar';


const SearchTextField = styled(TextField)({
         borderRadius: '20px',
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#888',
        },
        '&:hover fieldset': {
          borderColor: '#100',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#000',
        },
      },
 });

function Search(){
    const [searchKey, setSearchKey] = useState('');

    /*const handleInputChange = (event) => {
      setSearchKey(event.target.value);
     };*/
    return(
        
        <div className={style.outer}>
            <Head>
                <title>Search</title>
                <meta name="description" content="created by team"  />

                <link rel="icon" href="/favicon.ico"/> 
            </Head>
            <div className={style.navbar}>
            <Navbar />
            </div>
            <div className={style.searchBox}>
                <Box sx={{ width: 1350, maxWidth: '100%'}}>
                    <SearchTextField fullWidth  placeholder="Search Article" id="fullWidth" type="search" 
                    InputProps={{style: {borderRadius: '20px'} ,  startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      )}}  />
                </Box>
            </div> 
            <div className={style.articleBoxOuter}>
                < SearchArticleBox/> 
            </div>
        </div>
    );
};

export default Search;
