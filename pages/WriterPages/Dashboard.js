import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/createArticleNavbar";
import WriterDashboardSummeryTable from "../../components/article/WriterDashboardSummeryTable";
import Typography from "@mui/material/Typography";
import Lottie from "react-lottie";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [articles, setArticles] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("username");
    setUserId(storedUserId);
    setUserName(storedUserName);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`https://article-writing-backend.onrender.com/api/article/writer/${userId}`);
        if (response.data.success) {
          setArticles(response.data.articles);
        } else {
          console.error("Failed to fetch articles:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        alert("Failed to load articles. Please check your network and try again.");
      }
    };

    if (userId) {
      fetchArticles();
    }
  }, [userId]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    path: "/WriterAnimation.json",
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
        <div style={{ maxWidth: "600px", margin: "auto", marginBottom: "20px" }}>
          <Lottie options={defaultOptions} height={600} width={600} />
        </div>
        <WriterDashboardSummeryTable articles={articles} />
      </Navbar>
    </div>
  );
};

export default Dashboard;
