import React, { useState } from 'react';
import { Container, Typography, Box, Button, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axioaClient from '../axios-Client';
import FadeIn from 'react-fade-in';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [mobile, setMobile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a temporary URL for the selected image file
    const imageUrl = URL.createObjectURL(selectedFile);

    // Set the temporary URL as the src of the img element
    const imgElement = document.getElementById('uploadedImage');
    imgElement.src = imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axioaClient.post('/perform_text_detection', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!response.data) {
        throw new Error('Failed to perform text detection.');
      }

      const { name, mobile } = response.data;
      setName(name);
      setMobile(mobile);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <FadeIn>
      <Container maxWidth="sm" className='mt-24'>
        <img src="/images/logo.jpeg" alt="" width={250} className='m-auto '/>
        <Box my={4} textAlign="center">
          <Typography variant="h4" component="h2" gutterBottom>
            Upload an Image
          </Typography>
          <Box
            border={2}
            borderColor="success.main"
            borderRadius={8}
            p={4}
            textAlign="center"
            cursor="pointer"
            marginBottom={4}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFileChange(e);
            }}
          >
            {/* Display the uploaded image */}
            <img id="uploadedImage" src="" alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '250px', marginBottom: '16px' }} className='m-auto' />

            <Input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput">
              <CloudUploadIcon fontSize="large" color="success" sx={{ marginBottom: '8px' }} />
              <Typography variant="h6" color="success">Drag and drop or click to upload</Typography>
            </label>
          </Box>
          <FadeIn>
            <Button
              variant="contained"
              onClick={handleSubmit}
              size="large"
              color="success"
            >
              Submit
            </Button>
          </FadeIn>
          {name && (
            <Typography variant="h6" component="p" mt={4}>
              Name: {name}
            </Typography>
          )}
          {mobile && (
            <Typography variant="h6" component="p" mt={2}>
              Mobile: {mobile}
            </Typography>
          )}
        </Box>
      </Container>
    </FadeIn>
  );
};

export default ImageUpload;
