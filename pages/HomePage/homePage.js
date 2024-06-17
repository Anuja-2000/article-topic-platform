//import TrendingArticleBox from "../Trending/trendingArticleBox";
import SearchArticleBox from '../searchArticle/searchArticleBox';
import style from "../../styles/search.module.css";
import Styles from '../../styles/homePage.module.css'
import React from 'react';
import ReportDialog from "../../components/article/reportDialog";
import { Button, Typography } from "@mui/material";
import Link from 'next/link';
import { useState } from 'react';
import Search from '../searchArticle/search';
import HomeNav from './homeNav';
import PopularArticleBox from '../Trending/popularArticleBox';
function HomePage() {

   
    return (
        <div className={Styles.outer}>
            <HomeNav />
            <div className={Styles.introBox}>

            
                <h1 className={Styles.h1}>Start Today</h1>
                <p className={Styles.paragraph}>Discover stories, thinking, and expertise from writers on any topic</p>
                <Button sx={{ borderRadius: 6, marginLeft: 13, marginTop: 4, height: 52, fontSize: 20, textTransform: 'none', fontFamily: 'Ubuntu' }} variant="contained">Get Started</Button>
               
            </div>
            <h3 className={Styles.trending}>#Popular Articles</h3>
            <div className={style.articleBoxOuter}>
                < PopularArticleBox/>
            </div>

        </div>
    );

}

export default HomePage;
