import Box from '@mui/material/Box';
import HomeNav from './homeNav';
import { Paper } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';


export default function Faq() {
    return (
        <>
            <HomeNav />
            <Box component="section" marginTop={'13vh'} padding={5}>
                <Paper elevation={3}  sx={{ padding: '20px', backgroundColor:'primary.main' }}>
                    <Typography variant='h5'marginBottom={2} color={'white'}> Frequently Asked Questions</Typography>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>1. What is "Writer Gate"?</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                        Writer Gate is a content publishing platform that allows users to create, share, and discover articles on a wide range of topics.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>2. How can I write an article?</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                        After creating an account, you can read an article by clicking on the "Write Articles" button on the navigation bar.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>3. How can I read an article?</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                        You can read some trending articles on home page. After creating an account, you can read articles on the home page. Also you can search for articles.
                        </AccordionDetails>
                    </Accordion>    
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>4. How can I view the articles I have written?</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                        After creating an account, you can view the articles you have written by clicking on the "My Articles" button on the navigation bar.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>5. How can I publish an article on Writer Gate? </h2>
                        </AccordionSummary>
                        <AccordionDetails>
                        After creating your article you can submit it for admin approval. After admin approval, your article will be published.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>6. How can I edit or delete my published articles? </h2>
                        </AccordionSummary>
                        <AccordionDetails>
                        You can edit or delete your published articles by clicking on the "My Articles" button on the navigation bar and then clicking on the "Edit" or "Delete" button. Then you again need to submit it for approval to publish
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>7. Is Writer Gate free to use? </h2>
                        </AccordionSummary>
                        <AccordionDetails>
                        Yes, it's free.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>8. How do I connect with other users on Writer Gate?</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                        As readers you can subscribe to writers on their profile.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>9. What are publications on Writer Gate?</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                        Publications on Writer Gate are articles centered around specific themes or topics. Writers can submit their work to publications for a chance to reach a broader audience.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <h2>10. How can I contact Writer Gate support?</h2>
                        </AccordionSummary>
                        <AccordionDetails>
                        Visit the "Contact Us" page and fill out the form to contact Writer Gate support.
                        </AccordionDetails>
                    </Accordion>
                </Paper>
            </Box>
        </>
    )
}