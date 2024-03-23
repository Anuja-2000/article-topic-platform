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
function HomePage() {

    //Start........need to move i will do that (Chamodya)
    const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleReportClick = () => {
        setIsReportDialogOpen(true);
    };

    const handleCloseReportDialog = () => {
        setIsReportDialogOpen(false);
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000); // Clear success message after 3 seconds
    };
  //End........need to move i will do that (Chamodya)
    return (
        <div className={Styles.outer}>
            <HomeNav />
            <div className={Styles.introBox}>

            
                <h1 className={Styles.h1}>Start Today</h1>
                <p className={Styles.paragraph}>Discover stories, thinking, and expertise from writers on any topic</p>
                <Button sx={{ borderRadius: 6, marginLeft: 13, marginTop: 4, height: 52, fontSize: 20, textTransform: 'none', fontFamily: 'Ubuntu' }} variant="contained">Get Started</Button>
                {/*Start........need to move i will do that (Chamodya)*/}
               {/* <button onClick={handleReportClick}>Report</button>*/}
            <ReportDialog isOpen={isReportDialogOpen} onClose={handleCloseReportDialog} onSuccess={handleSuccess} />
            {successMessage && (
              <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center' }}>
                {successMessage}
              </div>
            )}
{/*End........need to move i will do that (Chamodya)*/}
            </div>
            <h3 className={Styles.trending}>#Trendings</h3>
            <div className={style.articleBoxOuter}>
                < SearchArticleBox keyword={' '} />
            </div>

        </div>
    );

}

export default HomePage;
