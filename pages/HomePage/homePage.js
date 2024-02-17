//import TrendingArticleBox from "../Trending/trendingArticleBox";
import SearchArticleBox from '../searchArticle/searchArticleBox';
import style from "../../styles/search.module.css";
import Styles from '../../styles/homePage.module.css'
import React from 'react';
import { Button,Typography } from "@mui/material";
import Link from 'next/link';

function HomePage(){

    return(
        <div className={Styles.outer}>
            <div className={Styles.navBar} >
                <div style={{ flexGrow: 0.1 }} ></div>
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
                          }}>
                          GATE
                </Typography>
        
                <div style={{ flexGrow: 1 }} ></div>
                <Link href="/contactUs"> <Button  sx={{marginRight:4, textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}}>Contact Us</Button></Link>
                <Link href="/login"> <Button  sx={{marginRight:4 , textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}}>Sign In</Button></Link>
                <Link href="/register"> <Button sx={{borderRadius:6,marginRight:14,textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}} variant="contained">Sign Up for Free</Button></Link>
            </div>
            <div className={Styles.introBox}>
                <h1 className={Styles.h1}>Start Today</h1>
                <p className={Styles.paragraph}>Discover stories, thinking, and expertise from writers on any topic</p>
                <Button sx={{borderRadius:6,marginLeft:13,marginTop:4,height:52,fontSize:20,textTransform: 'none', fontFamily:'Ubuntu'}} variant="contained">Get Started</Button>
            </div>
            <h3 className={Styles.trending}>#Trendings</h3>
            <div className={style.articleBoxOuter}>
                { < SearchArticleBox/> }
            </div>
            
        </div>
    );

}

export default HomePage;