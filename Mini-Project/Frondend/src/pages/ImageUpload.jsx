import React, { useState } from 'react';
import { Container, Typography, Box, Button, Input, Dialog,TextField, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axioaClient from '../axios-Client';
import FadeIn from 'react-fade-in';
import { ToastContainer, toast } from 'react-toastify';
import { Phone } from '@mui/icons-material';
import { useStateContext } from '../context/contextProvider';

const generateRandomPassword = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  
  return password;
};

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const {setToken,setUser}=useStateContext();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Create a temporary URL for the selected image file
    const imageUrl = URL.createObjectURL(selectedFile);

    // Set the temporary URL as the src of the img element
    const imgElement = document.getElementById('uploadedImage');
    imgElement.src = imageUrl;
    imgElement.style.opacity='1';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select an image file.');
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
      setOpenDialog(true);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRegister=(ev)=>{
    ev.preventDefault();
    const generatedPassword = generateRandomPassword(8);

    const payload = {
      name: name,
      id: mobile,
      Phone: phoneNumber,
      password: generatedPassword,
      email:"notprovided@gmail.com"
    };
    console.log(payload)
    axioaClient.post('/signupWithImage', payload)
    .then(response => {
      console.log(response.data.message); // Handle success response
      console.log("gfghfgh")
      toast.success(response.data.message)
      setUser(response.data.user)
      setToken(123)

      

      
    })
    .catch(error => {
      console.log(error.response.data.error); // Handle error
      console.log("dsdfsdf")
      toast.error(error.response.data.error)
      
    });
  }

  return (
    <FadeIn>
      <Container maxWidth="sm" className='mt-18'>
        <img src="/images/logo.jpeg" alt="" width={250} className='m-auto '/>
        <Box my={4} textAlign="center" >
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
            <img id="uploadedImage" src="" alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '250px', marginBottom: '16px', opacity:'0' }} className='m-auto' />

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
          <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle bgcolor='green' className=' text-cyan-50'>Form Submission Details</DialogTitle>
          <DialogContent className='mt-8'>
          <TextField
    margin="dense"
    id="name"
    label="Name"
    type="text"
    fullWidth
    value={name}
    onChange={(e) => setName(e.target.value)}
    color='success'
  />

  {/* TextField for ID Number */}
  <TextField
    margin="dense"
    id="idNumber"
    label="ID Number"
    type="text"
    fullWidth
    value={mobile}
    onChange={(e) => setMobile(e.target.value)}
    color='success'
  />

  {/* Additional input field for phone number */}
  <TextField
    margin="dense"
    id="phoneNumber"
    label="Phone Number"
    type="text"
    fullWidth
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    color='success'
  />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="success">
              Close
            </Button>
            <Button onClick={handleRegister} color="success">
              Register
            </Button>
          </DialogActions>
          
        </Dialog>
        </Box>
      </Container>
    </FadeIn>
  );
};

export default ImageUpload;
