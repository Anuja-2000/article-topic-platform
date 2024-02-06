import React from 'react';
import Navbar from '../../components/Navbar';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';


export const getStaticProps = async () => {
  const response = await fetch('https://vmm8vve6hg.execute-api.us-east-1.amazonaws.com/topicTemplates/templates');
  const data = await response.json();
  return {
    props: { templates: data.templates }
  };
};
function ArticleTypes({ templates }) {


  const articleTypes = [...new Set(templates.map(template => template.articleType))];

  const getTemplateIdsByArticleType = (articleType) => {
    const matchingTemplates = templates.filter(template => template.articleType === articleType);
    return matchingTemplates.map(template => template.templateId);
  }

  return (
    <div>
      <Navbar>

     
      <Box
        sx={{
          padding: '20px',
          marginTop: '2px',
          marginLeft: '300px',
          marginRight: '260px',
          backgroundColor: '#242444',
          color: 'white',
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="Article-Types-Table">
            <TableHead >

              <TableRow sx={{ backgroundColor: '#b3b3b3' }}>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Article Type</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Template Id s</TableCell>
               
              </TableRow>

            </TableHead>
            <TableBody>
              {articleTypes.map(articleType => (
                <TableRow key={articleTypes}>
                  <TableCell style={{ width: 260 }} >
                    {articleType}
                  </TableCell>
                  <TableCell component="th" scope="row">{getTemplateIdsByArticleType(articleType).join(', ')}</TableCell>

               
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      </Navbar>
    </div>
  );
};



export default ArticleTypes;