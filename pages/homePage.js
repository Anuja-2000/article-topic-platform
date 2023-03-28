import TrendingArticleBox from "./Trending/trendingArticleBox";
import Styles from '../styles/homePage.module.css'
import React from 'react';
import { Button } from "@mui/material";


function HomePage(){

    return(
        <div className={Styles.outer}>
            <div className={Styles.navBar} >
                <div style={{ flexGrow: 0.2 }} ></div>
                <div>Logo</div>
                <div style={{ flexGrow: 1 }} ></div>
                <Button href="#text-buttons" sx={{marginRight:4, textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}}>Contact Us</Button>
                <Button href="#text-buttons" sx={{marginRight:4 , textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}}>Sign In</Button>
                <Button sx={{borderRadius:6,marginRight:14,textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}} variant="contained">Sign Up for Free</Button>
            </div>
            <div className={Styles.introBox}>
                <h1 className={Styles.h1}>Start Today</h1>
                <p className={Styles.paragraph}>Discover stories, thinking, and expertise from writers on any topic</p>
                <Button sx={{borderRadius:6,marginLeft:13,marginTop:4,height:52,fontSize:20,textTransform: 'none', fontFamily:'Ubuntu'}} variant="contained">Get Started</Button>
            </div>
            <h3 className={Styles.trending}>#Trendings</h3>
            <div className={Styles.trends}>< TrendingArticleBox /> </div>
        </div>
    );

}

export default HomePage;