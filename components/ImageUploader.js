
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Typography, Paper } from '@mui/material';
import styles from '../styles/articleImages.module.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ImageUploader = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = async (event) => {
    const files = Array.from(event.target.files);
    const uploadedImages = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const imageUrl = response.data.url;
        uploadedImages.push({ id: uuidv4(), url: imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    const updatedImages = [...images, ...uploadedImages].slice(0, 5);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleRemoveImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', margin: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Upload Article Images (Max 5)
      </Typography>
      <div className={styles.imageGrid}>
        {images.map((image) => (
          <div key={image.id} className={styles.imageContainer}>
            <img src={image.url} alt="Uploaded" className={styles.uploadedImage} />
            <button onClick={() => handleRemoveImage(image.id)} className={styles.removeButton}>
              &times;
            </button>
          </div>
        ))}
        {[...Array(5 - images.length)].map((_, index) => (
          <div key={index} className={styles.uploadTile}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id={`image-input-${index}`}
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor={`image-input-${index}`} className={styles.uploadLabel}>
              <IconButton color="primary" aria-label="upload picture" component="span">
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default ImageUploader;