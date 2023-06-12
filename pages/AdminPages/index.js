import Head from "next/Head"
import Navbar from '../../components/Navbar';
import Image from "next/image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box'


function Home() {
  return (
    <>
      <Head>
        <title>Admin Page</title>
      </Head>
      <Navbar />

      <Box sx={{ backgroundColor: "#736fec", minHeight: "100vh", marginLeft: "64px" }}>
        <Card sx={{ maxWidth: "600px", margin: "auto" }}>
          <CardContent>
            <Image src="/templates.png" alt="My Image" width={600} height={400} layout="responsive" />

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: "monospace",
                letterSpacing: ".2rem",
                fontSize: { xs: "1rem", sm: "2rem", md: "3rem" },
                fontWeight: "bold",
                textAlign: "center",
                margin: "2rem",
                transition: "color 0.5s",
                "&:hover": {
                  color: "#083d18",
                },
              }}
            >
              Welcome to Admin Page
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default Home