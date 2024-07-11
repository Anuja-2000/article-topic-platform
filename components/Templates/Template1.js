import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { Check } from '@mui/icons-material';
import { Typography } from '@mui/material';
const Template1 = ({ onSelect }) => {
  const [image1Base64, setImage1Base64] = useState('');
  const [image2Base64, setImage2Base64] = useState('');
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result;
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 500; 
          const maxHeight = 300; 
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, width, height);

          const resizedBase64 = canvas.toDataURL(file.type);
          setImage1Base64(resizedBase64);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelect = () => {
    const templateContent = `
      <h1>Introduction to the Topic</h1>
      <p><br></p>
      <p><span class="ql-size-large">Welcome to this dummy blog post. This section </span><em class="ql-size-large">introduces the topic and provides an overview.</em></p>
      <p><br></p>
      <p><br></p>
       <img 
          src="${image1Base64}" 
          alt="Template 1 Image 1" 
          style={{ width: '100%', maxWidth: '100%', marginBottom: '10px' }}
        />
      <p><br></p>
      <p><em> Illustration of dummy image</em></p>
      <p><br></p>
      <h1>Main Content</h1>
      <p><br></p>
      <p><span class="ql-size-large">In this section, we dive into the main content of the blog post. You can define subheadings as you need.</span></p>
      <ul>
        <li>Subheading1</li>
        <li>Subheading2</li>
        <li>Subheading3</li>
      </ul>
      <p><br></p>
      <p><br></p>
      <p><strong class="ql-size-large">Subheading 1</strong></p>
      <p><br></p>
      <p><span class="ql-size-large">This is the first subheading under the main content section. Here, we discuss various points in detail.</span></p>
      <p><br></p>
      <ul>
        <li><strong>Bold Point 1: </strong>This is a bold point to emphasize important information.</li>
        <li><strong>Bold Point 2: </strong>This is a bold point to emphasize important information.</li>
        <li><strong>Bold Point 3: </strong>This is a bold point to emphasize important information.</li>
      </ul>
      <p><br></p>
      <p><br></p>
      <p><strong class="ql-size-large">Subheading 2</strong></p>
      <p><br></p>
      <p><span class="ql-size-large">This is the second subheading under the main content section. Here, we discuss various points in detail.</span></p>
      <p><br></p>
      <ul>
        <li><strong>Bold Point 1: </strong>This is a bold point to emphasize important information.</li>
        <li><strong>Bold Point 2: </strong>This is a bold point to emphasize important information.</li>
        <li><strong>Bold Point 3: </strong>This is a bold point to emphasize important information.</li>
      </ul>
      <p><br></p>
      <p><br></p>
      <p><strong class="ql-size-large">Subheading 3</strong></p>
      <p><br></p>
      <p><span class="ql-size-large">This is the third subheading under the main content section. Here, we discuss various points in detail.</span></p>
      <p><br></p>
      <ul>
        <li><strong>Bold Point 1: </strong>This is a bold point to <u>emphasize</u> important information.</li>
        <li><strong>Bold Point 2: </strong>This is a bold point to <u>emphasize</u> important information.</li>
        <li><strong>Bold Point 3: </strong>This is a bold point to <u>emphasize </u>important information.</li>
      </ul>
      <p><br></p>
      <p><br></p>
      <h1>Conclusion</h1>
      <p><br></p>
      <p><span class="ql-size-large">In conclusion, we summarize the</span><strong class="ql-size-large"> key points </strong><span class="ql-size-large">discussed in the blog post. </span></p>
      <p><br></p>
      <p><br></p>
      <h1>References</h1>
      <p><br></p>
      <ol>
        <li>Author, A. (2023).<em> Title of the Book</em>. Publisher.</li>
        <li>Author, B. (2021).<em> Title of the Book</em>. Publisher.</li>
        <li>Author, C. (2020).<em> Title of the Book</em>. Publisher.</li>
      </ol>
    `;
    onSelect(templateContent);
  };


  return (
    <div style={{ textAlign: "right",  maxWidth: '310px' }}>
      <div style={{ textAlign: "left" }}>
        <Typography variant="body" marginBottom={2} color={"primary.dark"} marginTop={2} textAlign="left">  Template 1</Typography>
      </div>
      <div style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '300px', maxHeight: '400px', overflowY: 'scroll', textAlign: 'left' }}>
        <h2>Introduction to the Topic</h2>
        <p><br /></p>
        <p>Welcome to this dummy blog post. This section <i>introduces the topic and provides an overview.</i></p>
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
            onChange={(e) => handleFileInputChange(e, setImage1Base64)}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </Button>
        {image1Base64 && (
          <img
            src={image1Base64}
            alt="Template 1 Image 1"
            style={{ width: '100%', maxWidth: '100%', marginBottom: '10px', display: 'block', margin: '0 auto' }} />
        )}
        <p><br /></p>
        <p><br /></p>
        <p><i>Illustration of dummy image</i></p>
        <p><br /></p>
        <h2>Main Content</h2>
        <p><br /></p>
        <p>In this section, we dive into the main content of the blog post. You can define subheadings as you need.</p>
        <div style={{ paddingLeft: '40px' }}>
          <ul>
            <li>Subheading1</li>
            <li>Subheading2</li>
            <li>Subheading3</li>
          </ul>
        </div>
        <p><br /></p>
        <p><br /></p>
        <h3>Subheading 1</h3>
        <p><br /></p>
        <p>This is the first subheading under the main content section. Here, we discuss various points in detail.</p>
        <p><br /></p>
        <div style={{ paddingLeft: '40px' }}>
          <ul>
            <li><b>Bold Point 1:</b> This is a bold point to emphasize important information.</li>
            <li><b>Bold Point 2:</b> This is a bold point to emphasize important information.</li>
            <li><b>Bold Point 3:</b> This is a bold point to emphasize important information.</li>
          </ul>
        </div>
        <p><br /></p>
        <p><br /></p>
        <h3>Subheading 2</h3>
        <p><br /></p>
        <p>This is the second subheading under the main content section. Here, we discuss various points in detail.</p>
        <p><br /></p>
        <div style={{ paddingLeft: '40px' }}>
          <ul>
            <li><b>Bold Point 1:</b> This is a bold point to emphasize important information.</li>
            <li><b>Bold Point 2:</b> This is a bold point to emphasize important information.</li>
            <li><b>Bold Point 3:</b> This is a bold point to emphasize important information.</li>
          </ul>
        </div>
        <p><br /></p>
        <p><br /></p>
        <h3>Subheading 3</h3>
        <p><br /></p>
        <p>This is the third subheading under the main content section. Here, we discuss various points in detail.</p>
        <p><br /></p>
        <div style={{ paddingLeft: '40px' }}>
          <ul>
            <li><b>Bold Point 1:</b> This is a bold point to emphasize important information.</li>
            <li><b>Bold Point 2:</b> This is a bold point to emphasize important information.</li>
            <li><b>Bold Point 3:</b> This is a bold point to emphasize important information.</li>
          </ul>
        </div>
        <p><br /></p>
        <p><br /></p>
        <h2>Conclusion</h2>
        <p><br /></p>
        <p>In conclusion, we summarize the <b>key points</b> discussed in the blog post.</p>
        <p><br /></p>
        <p><br /></p>
        <h2>References</h2>
        <p><br /></p>
        <div style={{ paddingLeft: '40px' }}>
          <ol>
            <li>Author, A. (2023). <i>Title of the Book.</i> Publisher.</li>
            <li>Author, B. (2021). <i>Title of the Book.</i> Publisher.</li>
            <li>Author, C. (2020). <i>Title of the Book.</i> Publisher.</li>
          </ol>
        </div>
      </div>
      <Button variant="contained" onClick={handleSelect} style={{ margin: '10px', borderRadius: '20%', minWidth: '30px', minHeight: '30px' }}><Check /></Button>
    </div>

  );
};
export default Template1;

