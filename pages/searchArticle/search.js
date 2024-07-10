import React, { useState, useEffect } from 'react';
import style from "../../styles/search.module.css";
import Head from "next/head"
import {Box, TextField, IconButton, InputAdornment,InputLabel,Select,MenuItem,Checkbox,ListItemText} from '@mui/material';
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
    const [selectedDomains, setSelectedDomains] = useState("All");
    const [domainsList, setDomainsList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/readerArticle/get-domains`, {
            headers: {
              'Content-Type': 'application/json', // Adjust the content type if needed
            },
        });
          const jsonData = await response.json();
          const processedData = jsonData.map(domain => domain === "" ? "All" : domain);
          setDomainsList(processedData);
          console.log(domainsList); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    const handleInputChange = (event) => {
      setSearchKey(event.target.value);
     };

     /*const domainsList = [
      'All',
      'anotherexample.com',
      'sampledomain.com',
    ];*/
     
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedDomains(
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    
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
                    <SearchTextField onChange={handleInputChange} fullWidth  placeholder="Search Article" id="fullWidth" type="search" 
                    InputProps={{style: {borderRadius: '20px'} ,  startAdornment: (
                        <InputAdornment position="start">
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      )}}  />
                </Box>
                <Box>
                {/*<InputLabel>Filter by Domain</InputLabel>*/}
                <Select
                  value={selectedDomains}
                  onChange={handleChange}
                  sx={{ ml:2}}
                >
                  {domainsList.map((domain) => (
                    <MenuItem key={domain} value={domain}>
                      {domain}
                    </MenuItem>
                  ))}
                </Select>
                </Box>
            </div> 
            <div className={style.articleBoxOuter}>
                < SearchArticleBox keyword={searchKey} selectedDomain={selectedDomains}/> 
            </div>
        </div>
    );
};

export default Search;
