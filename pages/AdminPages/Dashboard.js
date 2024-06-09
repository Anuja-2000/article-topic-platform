"use client";
import React, { use } from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { PickersActionBar } from "@mui/x-date-pickers";
import urls from "../../enums/url";
import { Skeleton } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginBottom: "20px",
  display: "flex",
  justifyContent: "center",
  boxShadow: "0 0 15px rgba(0, 0, 0, 0.4)",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  letterSpacing: ".1rem",
  color: theme.palette.primary.contrastText,
}));

const StyledCount = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 700,
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  marginTop: "10px",
}));

const CustomActionBar = () => {
  <div></div>;
};

function Dashboard({}) {
  function getCurrentDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    return dateString;
  }

  function getCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    return timeString;
  }

  const [msgcount, setMsgCount] = React.useState(0);
  const [topicDomainCount, setTopicDomainCount] = useState(0);
  const [keywordCount, setKeywordCount] = useState(0);
  const [topicCount, setTopicCount] = useState(0);
  const [isLoading, setLoading] = React.useState(true);
  const [userName, setUserName] = React.useState("");

  useEffect(() => {
    if (isLoading) {
      axios
        .get(`${urls.BASE_URL_CONTACT_MESSAGE}get-count`)
        .then((res) => {
          const data = res.data;
          setMsgCount(data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:3001/api/topicDomains/count")
        .then((res) => {
          const data = res.data;
          setTopicDomainCount(data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:3001/api/keywords/count")
        .then((res) => {
          const data = res.data;
          setKeywordCount(data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:3001/api/topics/count")
        .then((res) => {
          const data = res.data;
          setTopicCount(data);
        })
        .catch((error) => {
          console.log(error);
        });

      const userId = localStorage.getItem("userId");
      let displayName = "";

      axios
        .get(`http://localhost:3001/api/user/${userId}`)
        .then((res) => {
          displayName = res.data.displayName;
          displayName = displayName.split(" ")[0];
          setUserName(displayName);
        })
        .catch((error) => {
          console.log(error);
        });

      setLoading(false);
    }
  }, [isLoading]);

  const [date, setDate] = React.useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar>
        <Box
          sx={{
            padding: "10px",
            marginTop: "2px",
            marginLeft: "20px",
            marginRight: "20px",
            backgroundColor: "white",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {topicCount != 0 || msgcount != 0 ? (
              <>
                <StyledCard>
                  <CardContent>
                    <StyledTitle variant="h6" component="div">
                      Topic Domain Count
                    </StyledTitle>
                    <StyledCount variant="h3" component="div">
                      {topicDomainCount.count}
                    </StyledCount>
                  </CardContent>
                </StyledCard>
                <StyledCard>
                  <CardContent>
                    <StyledTitle variant="h6" component="div">
                      Keyword Count
                    </StyledTitle>
                    <StyledCount variant="h3" component="div">
                      {keywordCount.count}
                    </StyledCount>
                  </CardContent>
                </StyledCard>

                <StyledCard>
                  <CardContent>
                    <StyledTitle variant="h6" component="div">
                      Topics Count
                    </StyledTitle>
                    <StyledCount variant="h3" component="div">
                      {topicCount.count}
                    </StyledCount>
                  </CardContent>
                </StyledCard>

                <StyledCard>
                  <CardContent>
                    <StyledTitle variant="h6" component="div">
                      Unread Messages Count
                    </StyledTitle>
                    <StyledCount variant="h3" component="div">
                      {msgcount}
                    </StyledCount>
                  </CardContent>
                </StyledCard>
              </>
            ) : (
              <>
                <StyledCard>
                  <CardContent>
                    <StyledTitle variant="h6" component="div">
                      <Skeleton variant="rectangular" width={200} height={30} />
                    </StyledTitle>
                    <StyledCount variant="h3" component="div">
                      <center><Skeleton variant="rectangular" width={30} height={40} /></center>
                    </StyledCount>
                  </CardContent>
                </StyledCard>
                <StyledCard>
                  <CardContent>
                    <StyledTitle variant="h6" component="div">
                      <Skeleton variant="rectangular" width={200} height={30} />
                    </StyledTitle>
                    <StyledCount variant="h3" component="div">
                      <center><Skeleton variant="rectangular" width={30} height={40} /></center>
                    </StyledCount>
                  </CardContent>
                </StyledCard>
                <StyledCard>
                  <CardContent>
                    <StyledTitle variant="h6" component="div">
                      <Skeleton variant="rectangular" width={200} height={30} />
                    </StyledTitle>
                    <StyledCount variant="h3" component="div">
                      <center><Skeleton variant="rectangular" width={30} height={40} /></center>
                    </StyledCount>
                  </CardContent>
                </StyledCard>
                <StyledCard>
                  <CardContent>
                    <StyledTitle variant="h6" component="div">
                      <Skeleton variant="rectangular" width={200} height={30} />
                    </StyledTitle>
                    <StyledCount variant="h3" component="div">
                      <center><Skeleton variant="rectangular" width={30} height={40} /></center>
                    </StyledCount>
                  </CardContent>
                </StyledCard>
              </>
            )}
          </Box>
          <Box>
            <StyledCard>
              <CardContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDateTimePicker
                    orientation="landscape"
                    defaultValue={dayjs(date)}
                    readOnly
                    slots={{
                      actionBar: CustomActionBar,
                    }}
                    slotProps={{
                      tabs: {
                        hidden: true,
                      },
                      toolbar: {},
                      calendarHeader: {
                        sx: { color: "black" },
                      },
                    }}
                    sx={{
                      backgroundColor: "primary.main",
                      "& MuiPickersLayout-root": { color: "white" },
                    }}
                  />
                </LocalizationProvider>
              </CardContent>
            </StyledCard>
          </Box>
        </Box>
      </Navbar>
    </div>
  );
}
export default Dashboard;
