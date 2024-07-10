import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { Check } from '@mui/icons-material';
import { Typography } from '@mui/material';
const Template2 = ({ onSelect }) => {
  const [imageBase64, setImageBase64] = useState('');

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelect = () => {
    const templateContent = `
    <p><br></p>
      <p><span class="ql-size-large">This is the first paragraph of the this dummy blog post.</span></p>
      <p><br></p>
      <p><br></p>
  
      <p><span class="ql-size-large">This is the second paragraph of the this dummy blog post.</span></p>
      
      <p><br></p>
      <p><br></p>
   
      <p><span class="ql-size-large">This is the second paragraph of the this dummy blog post.</span></p>
      <p><br></p>
      <p><br></p>

      <p><span class="ql-size-large">This is the third paragraph of the this dummy blog post.</span></p>
      <p><br></p>
      <p><br></p>
      
      <p><span class="ql-size-large">This is the fourth paragraph of the this dummy blog post.</span></p>
      <p><br></p>
      <p><br></p>

      <img 
          src="${imageBase64}" 
          alt="Template 1 Image 1" 
          style={{ width: '100%', maxWidth: '100%', marginBottom: '10px' }}
        />
      <p><br></p>
      <p><em> Illustration of dummy image</em></p>
    `;
    onSelect(templateContent);
  };


  return (
    <div style={{ textAlign: "right", maxWidth: '310px'  }}>
      <div style={{ textAlign: "left" }}>
        <Typography variant="body" marginBottom={2} color={"primary.dark"} marginTop={2} textAlign="left">  Template 2</Typography>
      </div>
      <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '300px', maxHeight: '400px', overflowY: 'scroll', textAlign: 'left' }}>

        <p><br /></p>
        <p>This is the first paragraph of the this dummy blog post.</p>
        <p><br /></p>
        <p><br /></p>

        <p>This is the second paragraph of the this dummy blog post.</p>
        <p><br /></p>
        <p><br /></p>

        <p>This is the third paragraph of the this dummy blog post.</p>
        <p><br /></p>
        <p><br /></p>

        <p>This is the fourth paragraph of the this dummy blog post.</p>
        <p><br /></p>
        <p><br /></p>
        <Button
          component="label"
          variant="contained"
          startIcon={<Upload />}
          style={{ textTransform: 'none' }}
        >
          Upload an image
          <input
            type="file"
            onChange={(e) => handleFileInputChange(e, setImageBase64)}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </Button>
        {imageBase64 && (
          <img
            src={imageBase64}
            alt="Template 1 Image 1"
            style={{ width: '100%', maxWidth: '100%', marginBottom: '10px', display: 'block', margin: '0 auto' }} />
        )}

        <p><br /></p>
        <p><i>Illustration of dummy image</i></p>

      </div>
      <Button variant="contained" onClick={handleSelect} style={{ margin: '10px', borderRadius: '20%', minWidth: '30px', minHeight: '30px' }}><Check /></Button>
    </div>

  );
};
export default Template2;

