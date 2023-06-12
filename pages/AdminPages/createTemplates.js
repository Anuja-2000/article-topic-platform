import * as React from 'react';
import { useState } from "react";
import Navbar from '../../components/Navbar';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

export const getStaticProps = async () => {
  const response = await fetch('https://vrscop1u3m.execute-api.us-east-1.amazonaws.com/templatesProject/templates');
  const data = await response.json();
  return {
    props: { templates: data.templates }
  };
};
function createTemplates({ templates }) {

  //console.log(templates);
  const topicDomains = [...new Set(templates.map(template => template.topicDomain))];
  const articleTypes = [...new Set(templates.map(template => template.articleType))];


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [TopicDomain, setTopicDomain] = React.useState('');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ArticleType, setArticleType] = React.useState('');

  const handleChangeTopicDomain = (event) => {
    setTopicDomain(event.target.value);
  };

  const handleChangeArticleType = (event) => {
    setArticleType(event.target.value);
  };



  return (
    <div>
      <Box sx={{ backgroundColor: '#e6e6ee' }}>
        <Navbar />
        <Box
          sx={{
            padding: '20px',
            marginLeft: '300px',
            marginRight: '260px',
            marginTop: "64px",
            backgroundColor: '#1b1155',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ padding: '20px', backgroundColor: 'white' }}>

            <Grid container spacing={2}>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>

                  <InputLabel id="DropDownForTopicDomain">Topic Domain</InputLabel>
                  <Select
                    labelId="Topic Domain"
                    id="Topic-domain"
                    value={TopicDomain}
                    label="Topic Domain"
                    onChange={handleChangeTopicDomain}
                  >
                    <MenuItem value="">
                      <em>All</em>
                    </MenuItem>
                    {topicDomains.map((topicDomain, index) => (
                      <MenuItem key={index} value={topicDomain}>{topicDomain}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Select a topic domain</FormHelperText>
                </FormControl>

              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel id="DropDownForArticleType">Article Type</InputLabel>
                  <Select
                    labelId="Article-Type"
                    id="Article-Type"
                    value={ArticleType}
                    label="Article-Type"
                    onChange={handleChangeArticleType}
                  >
                    <MenuItem value="" >
                      <em>All</em>
                    </MenuItem>
                    {articleTypes.map((articleType, index) => (
                      <MenuItem key={index} value={articleType}>{articleType}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Select an article type</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box
                  component="form"
                  sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    textAlign: 'center',
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <span style={{ color: 'blue' }}>Enter Topic Template</span>
                  </div>
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Required"
                      defaultValue="Your Topic Template"
                      sx={{ mt: 2 }}
                    />
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ mt: 2 }}
                    >
                      Create
                    </Button>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
export default createTemplates;


