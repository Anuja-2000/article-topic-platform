import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/createArticleNavbar";
import WriterDashboardSummeryTable from "../../components/article/WriterDashboardSummeryTable";
import Typography from "@mui/material/Typography";
import Lottie from 'react-lottie';

function Dashboard() {
  const [userName, setUserName] = useState("");
  const [articles, setArticles] = useState([]);

  // Effect for initializing data
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserName(localStorage.getItem("username")); // Load username from local storage

    if (userId) {
      fetchArticles(userId); // Fetch articles if userId is available
    } else {
      console.error("No user ID found"); // If userId is not found
    }
  }, []);

  // Fetch articles
  const fetchArticles = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/article/writer/${userId}`);
      if (response.data.success) {
        setArticles(response.data.articles);
      } else {
        console.error("Failed to fetch articles:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      alert("Failed to load articles. Please check your network and try again."); // Improved user feedback
    }
  };

  // Animation in dashboard
  const defaultOptions = {
    loop: true,
    autoplay: true,
    path: '/WriterAnimation.json', 
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Navbar>
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "black",
            textDecoration: "none",
            paddingLeft: "10px",
            marginBottom: "30px",
          }}
        >
          Welcome {userName} to your Dashboard
        </Typography>
        {/* Animation prop setting */}
        <div style={{ maxWidth: '600px', margin: 'auto', marginBottom: '20px' }}>
          <Lottie options={defaultOptions} height={600} width={600} />
        </div>
        <WriterDashboardSummeryTable articles={articles} />
      </Navbar>
    </div>
  );
}

export default Dashboard;
