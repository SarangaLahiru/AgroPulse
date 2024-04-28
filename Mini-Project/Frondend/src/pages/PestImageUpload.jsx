import React, { useRef, useState } from 'react';
import FadeIn from 'react-fade-in';
import './PestImageUpload.css';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { UploadFile } from '@mui/icons-material';
import { Button, Dialog } from '@mui/material';
import axioaClient from '../axios-Client';
import { useStateContext } from '../context/contextProvider';

export default function PestImageUpload() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl]=useState(null);
    const [captureimageUrl,setCaptureimageUrl]=useState(null);
    const [pest,setPest]=useState(null);
    const [open,setOpen]=useState(false)
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const {translations}=useStateContext();

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        const objectUrl=URL.createObjectURL(uploadedFile)
        setImageUrl(objectUrl)
        
        if(UploadFile){

          Swal.fire({
            
            icon: "success",
            imageUrl:objectUrl,
            imageWidth:"100px",
            title: "Successfully Uploaded Image",
            showConfirmButton: false,
            timer: 1500
          });
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
        const objectUrl=URL.createObjectURL(droppedFile)
        setImageUrl(objectUrl)
        if(file){
          toast.success("successfull upload image")
        }

    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDetect = (e) => {
      e.preventDefault();
     // Check if file or snapshot is available
    if (!file && !captureimageUrl) {
      console.error('No file selected or snapshot taken');
      Swal.fire({
        icon: "error",
        title: translations.detection_msg_t2,
        text: translations.detection_msg_t1,
        confirmButtonText: "ok",
        customClass: {
          container: 'my-custom-modal-class'   // Custom class for the deny button
        }
    })

      return;
  }

  // Create a FormData object
  const formData = new FormData();

  // If file is available, append it to FormData
  if (file) {
      formData.append('image', file);
  }

  // If snapshot is available, append it to FormData
  if (captureimageUrl) {
      // Convert data URL to Blob object
      const byteString = atob(imageUrl.split(',')[1]);
      const mimeString = imageUrl.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });

      // Append the snapshot blob to FormData
      formData.append('image', blob, 'snapshot.png');
  }

    axioaClient.post('/detection', formData)
        .then(response => {
            console.log('Detection result:', response.data);
            // Handle detection result if needed
            setPest(response.data.result)
            const prediction=response.data.result;
            Swal.fire({
              title:prediction,
              icon:"info",
              text:"This is your pest name",
              showCancelButton: true,
              confirmButtonText: "See more Details",
              customClass: {
                container: 'my-custom-modal-class'   // Custom class for the deny button
              }
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
              } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
              }
            });
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    };

    const handleBack = () => {
        // Implement back functionality here
    };

    const handleTakePhoto = () => {
      setOpen(true)
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true })
              .then((stream) => {
                  const video = document.createElement('video');
                  video.srcObject = stream;
                  video.onloadedmetadata = () => {
                      video.play();
                  };
                  videoRef.current = video;
                  streamRef.current=stream;
                  // Append the video element to a container in the DOM
                  document.getElementById('videoContainer').appendChild(video);
                  
                  
              })
              .catch((error) => {
                  console.error('Error accessing camera:', error);
              });
      } else {
          console.error('getUserMedia is not supported in this browser.');
      }
  };
  const handleTakeSnapshot = () => {
    setOpen(false)
    if (videoRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL('image/png');

        // Display the captured image


        Swal.fire({
            
          icon: "success",
          imageUrl:imageDataURL,
          imageWidth:"100px",
          title: "Successfully Uploaded Image",
          showConfirmButton: false,
          timer: 1500,
          
        });
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
      }


        setFile("photo")
        setCaptureimageUrl(imageDataURL)
        setImageUrl(imageDataURL)
    }
};
  

    return (
        <FadeIn>
          

            <div className='mt-20'>
                <FadeIn>
                    <div className="box mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ml-5 mt-10 text-3xl">
                        <h2 className='sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl max-sm:text-xl' >{translations.detection_p1}</h2>
                        <h1 className='sm:text-4xl md:text-4xl lg:text-6xl xl:text-6xl 2xl:text-6xl max-sm:text-4xl'>{translations.detection_p2}</h1>
                    </div>
                </FadeIn>

                <div className="box1 w-full relative" onDrop={handleDrop} onDragOver={handleDragOver}>
                    <label htmlFor="fileUpload" className="file-upload">{imageUrl ? (
                            <img className='img -z-10 m-auto max-sm:p-5 2xl:scale-110 2xl:mt-8' width="1280px" src={imageUrl} alt="" />
                        ) : (
                            <img className='img -z-10 m-auto max-sm:p-5 2xl:scale-110 2xl:mt-8' width="1280px" src="./images/Rectangle 26.png" alt="" />
                        )}
                        <div className="dis w-full m-auto z-40 absolute max-sm:top-12 max-md:top-32 max-lg:top-40 max-xl:top-56 2xl:top-52 max-2xl:top-72">
                            <h2 className='name m-auto w-fit text-2xl max-sm:p-6 p-10 text-teal-50'>{file ? file.name : translations.detection_t1}</h2>
                            <img className='upload m-auto max-sm:-mt-4 max-sm:w-14 max-md:w-20 max-lg:w-24 max-xl:28' src="./images/Group 6.png" alt="" />
                        </div>
                    </label>
                    <input className=' bg-black' type="file" id="fileUpload" style={{ display: "none"}} onChange={handleFileChange} />

                    <div className="btn max-sm:m-5 sm:m-20 flex">
                        <div className="btn1 cursor-pointer active:scale-75 hover:drop-shadow-xl w-20 rounded-full">
                            <img onClick={handleTakePhoto} src="./images/Group 5.png" className='' alt="" />
                        </div>
                        <div className="btn2 absolute max-sm:right-5 sm:right-20 sm:text-xl">
                            <button className='sm:m-4 max-sm:m-1 bg-green-800 text-green-50 max-sm:p-3 max-sm:px-6 sm:p-3 sm:px-8 active:scale-75 hover:drop-shadow-xl rounded-full' onClick={handleDetect}>{translations.detection_b1}</button>
                            <button className='sm:m-4 max-sm:m-1 bg-green-800 text-green-50 max-sm:p-3 max-sm:px-6 sm:p-3 sm:px-9 active:scale-75 hover:drop-shadow-xl  rounded-full' onClick={handleBack}>{translations.detection_b2}</button>
                        </div>
                    </div>
                </div>
                <Dialog open={open}>
                <div id="videoContainer" className="video-container"></div>
                <Button onClick={handleTakeSnapshot} color='success'>Take photo</Button>
                {/* <h2>fsdfsf</h2> */}
                </Dialog>

                <img src="./images/logo2.png" className='w-fit m-auto max-sm:w-48' alt="" />
            </div>
        </FadeIn>
    );
}
