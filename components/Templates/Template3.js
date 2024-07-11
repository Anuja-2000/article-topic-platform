import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { Check } from '@mui/icons-material';
import { Typography } from '@mui/material';
const Template3 = ({ onSelect }) => {
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
    <p><strong>John:</strong>&nbsp;"Hey, Sarah, have you read about AI in sports?"</p>
    <p><br></p>
    <p><strong>Sarah:</strong>&nbsp;"Yes, it’s fascinating how AI is changing athlete performance and fan engagement."</p>
    <p><br></p>
    <p><strong>John:</strong>&nbsp;"Absolutely! AI analytics can predict game outcomes with incredible accuracy."</p>
    <p><br></p>
    <p><strong>Sarah:</strong>&nbsp;"And those AI-powered wearables? They provide real-time insights into player health and performance."</p>
    <p><br></p>
    <p><strong>John:</strong>&nbsp;"It’s like having a virtual coach on the field. AI is definitely reshaping sports as we know it."</p>
    <p><br></p>
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
    <div style={{ textAlign: "right", maxWidth: '310px' }}>
      <div style={{ textAlign: "left" }}>
        <Typography variant="body" marginBottom={2} marginTop={2} textAlign="left">Template 3</Typography>
      </div>
      <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '300px', maxHeight: '400px', overflowY: 'scroll', textAlign: 'left' }}>

        {/* Dialog between two people */}
        <div style={{ marginTop: '20px', padding: '10px', borderRadius: '5px' }}>
          <Typography variant="body1" style={{ marginBottom: '8px' }}><strong>John:</strong> &quot;Hey, Sarah, have you read about AI in sports?&quot;</Typography>
          <Typography variant="body1" style={{ marginBottom: '8px' }}><strong>Sarah:</strong> &quot;Yes, it&rsquo;s fascinating how AI is changing athlete performance and fan engagement.&quot;</Typography>
          <Typography variant="body1" style={{ marginBottom: '8px' }}><strong>John:</strong> &quot;Absolutely! AI analytics can predict game outcomes with incredible accuracy.&quot;</Typography>
          <Typography variant="body1" style={{ marginBottom: '8px' }}><strong>Sarah:</strong> &quot;And those AI-powered wearables? They provide real-time insights into player health and performance.&quot;</Typography>
          <Typography variant="body1" style={{ marginBottom: '8px' }}><strong>John:</strong> &quot;It&rsquo;s like having a virtual coach on the field. AI is definitely reshaping sports as we know it.&quot;</Typography>
        </div>
        <p><br /></p>
        <p>This is the first paragraph of this dummy blog post.</p>
        <p><br /></p>
        <p><br /></p>

        <p>This is the second paragraph of this dummy blog post.</p>
        <p><br /></p>
        <p><br /></p>

        <p>This is the third paragraph of this dummy blog post.</p>
        <p><br /></p>
        <p><br /></p>

        <p>This is the fourth paragraph of this dummy blog post.</p>
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
            alt="Template 3 Image"
            style={{ width: '100%', maxWidth: '100%', marginBottom: '10px', display: 'block', margin: '0 auto' }} />
        )}

        <p><br /></p>
        <p><i>Illustration of a dummy image</i></p>



      </div>
      <Button variant="contained" onClick={handleSelect} style={{ margin: '10px', borderRadius: '20%', minWidth: '30px', minHeight: '30px' }}><Check /></Button>
    </div>
  );
};

export default Template3;

