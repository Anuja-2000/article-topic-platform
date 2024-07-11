import React from 'react';
import { Box, styled } from '@mui/material';
import Template1 from './Template1'; 
import Template2 from './Template2';
import Template3 from './Template3';

const ScrollableBox = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  gap: '10px',
  padding: '10px',
  cursor: 'pointer',
  width: '100%',
  '&::-webkit-scrollbar': {
    height: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#0070FE',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#0080FE',
  },
});

const TemplateContainer = styled(Box)({
  flex: '0 0 auto',
  width: 'calc((100% / 3))',
  boxSizing: 'border-box',
  
});

const TemplateSelector = ({ onSelectTemplate }) => {
  const handleTemplateSelect = (templateContent) => {
    onSelectTemplate(templateContent);
  };

  return (
    <ScrollableBox>
      <TemplateContainer>
        <Template1 onSelect={handleTemplateSelect} />
      </TemplateContainer>
      <TemplateContainer>
        <Template2 onSelect={handleTemplateSelect} />
      </TemplateContainer>
      <TemplateContainer>
        <Template3 onSelect={handleTemplateSelect} />
      </TemplateContainer>
    </ScrollableBox>
  );
};

export default TemplateSelector;
