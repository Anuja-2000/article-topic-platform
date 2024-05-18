import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Typography, Paper } from '@mui/material';

const ArticleCoverImageUploader = ({ onImageUpload }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        if (onImageUpload) {
          onImageUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', margin: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Upload Cover Image
      </Typography>
      <div style={{
          border: '2px dashed #ccc',
          padding: '20px',
          marginBottom: '10px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '350px',
          position: 'relative' // Add relative positioning for absolute positioning inside
        }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="image-input"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="image-input" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          {!imagePreviewUrl && (
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera fontSize="large" />
            </IconButton>
          )}
        </label>
        {imagePreviewUrl && (
          <div style={{ width: '100%', height: '350px', overflow: 'hidden' }}>
            <img src={imagePreviewUrl} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        )}
      </div>
    </Paper>
  );
};

export default ArticleCoverImageUploader;