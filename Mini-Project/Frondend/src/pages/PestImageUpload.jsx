import { UploadFile } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CardActions, CardContent, CardMedia, Dialog, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import { Card } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import FadeIn from 'react-fade-in';
import { FourSquare } from 'react-loading-indicators';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axioaClient from '../axios-Client';
import { useStateContext } from '../context/contextProvider';
import './PestImageUpload.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function PestImageUpload() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [captureimageUrl, setCaptureimageUrl] = useState(null);
    const [pest, setPest] = useState(null);
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState('');
    const [solution, setSolution] = useState('');
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const { translations } = useStateContext();
    const [openBox, setOpenBox] = React.useState(false);
    const [openBox1, setOpenBox1] = React.useState(false);
    const [openBox2, setOpenBox2] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [solution1, setSolution1] = useState('')
    const [solution2, setSolution2] = useState('')
    const [solution3, setSolution3] = useState('')
    const [solutionDis, setSolutionDis] = useState('')


    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);
        const objectUrl = URL.createObjectURL(uploadedFile)
        setImageUrl(objectUrl)

        if (UploadFile) {

            Swal.fire({

                icon: "success",
                imageUrl: objectUrl,
                imageWidth: "100px",
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
        const objectUrl = URL.createObjectURL(droppedFile)
        setImageUrl(objectUrl)
        if (file) {
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
                const details = response.data.details
                    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Replace **text** with bold text
                    .replace(/\*/g, '<br><br>');
                const solution1 = response.data.solution1
                    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Replace **text** with bold text
                    .replace(/\*/g, '<br><br>');
                const solution2 = response.data.solution2
                    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Replace **text** with bold text
                    .replace(/\*/g, '<br><br>');
                const solution3 = response.data.solution3
                    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Replace **text** with bold text
                    .replace(/\*/g, '<br><br>');
                setDetails(details)
                setSolution1(solution1)
                setSolution2(solution2)
                setSolution3(solution3)


                const prediction = response.data.result;

                Swal.fire({
                    title: prediction,
                    icon: "info",
                    text: "This is your pest name",
                    showCancelButton: true,
                    confirmButtonText: "See more Details",
                    customClass: {
                        container: 'my-custom-modal-class'   // Custom class for the deny button
                    }
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        setOpenBox(true)
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
        setOpenBox(true);
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
                    streamRef.current = stream;
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
                imageUrl: imageDataURL,
                imageWidth: "100px",
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
    const handleClickOpen = () => {
        setOpenBox(true);
    };

    const handleClose = () => {
        setOpenBox(false);
    };
    const handleClose1 = () => {
        setOpenBox1(false);
    };
    const handleClose2 = () => {
        setOpenBox2(false);
    };
    const getSolutionDetails = (dis) => {
        setOpenBox2(true)

        axioaClient.post('/detection_details', JSON.stringify(dis), {
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(response => {
                const dis = response.data.solution_details

                    .replace(/\*\*(.*?)\*\*/g, '<br><b>$1</b>') // Replace **text** with bold text
                    .replace(/\*/g, '<br>') // Replace * with line break
                    .replace(/(\d+\.\s+)/g, '<br>') // Add line break after each number followed by a dot and space
                    .replace(/\:/g, '<br>');

                console.log(response)
                setSolutionDis(dis)
            })
            .catch(error => {

            });


    }


    return (
        <>
            {loading && (
                <div className='w-fit'>
                    <div className=' fixed top-0' style={{ backgroundColor: "white", width: "100%", height: "100vh", zIndex: "1000" }}>
                        <div className='relative top-80 w-20 m-auto'>
                            <FourSquare color="#32cd32" size="large" text="Loading..." />
                        </div>
                    </div>
                </div>

            )}




            < div >
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
                            <input className=' bg-black' type="file" id="fileUpload" style={{ display: "none" }} onChange={handleFileChange} />

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


                    </div>
                </FadeIn>
                <React.Fragment>

                    <Dialog
                        fullScreen
                        open={openBox}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                    >
                        <AppBar sx={{ position: 'relative', height: '60px', backgroundColor: "green" }}>
                            <Toolbar sx={{ position: "absolute", left: "10px" }}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>


                            </Toolbar>
                        </AppBar>
                        <Box>
                            <h2 data-aos="fade-up" className=' absolute left-20 top-28 text-5xl font-bold'>{pest}</h2>
                            <div data-aos="fade-up" className="m-10 mt-32 flex flex-wrap">
                                <div>
                                    <img src={imageUrl} className='max-sm:m-auto rounded-xl shadow-2xl' width="700px" alt="" />
                                </div>
                                <div className="max-sm:m-auto dis w-96 lg:relative -top-24 lg:ml-10 p-10" style={{ width: "700px" }}>
                                    <h3 className='text-3xl'>Details </h3>

                                    <div className='mt-4' dangerouslySetInnerHTML={{ __html: details }} />
                                    <Button onClick={() => setOpenBox1(true)} color='success' sx={{ marginTop: "50px", backgroundColor: "green", color: "white" }}>See solutions</Button>
                                </div>
                            </div>

                        </Box>

                    </Dialog>
                </React.Fragment>

                <React.Fragment>

                    <Dialog
                        fullScreen
                        open={openBox1}
                        onClose={handleClose1}
                        TransitionComponent={Transition}
                    >
                        <AppBar sx={{ position: 'relative', height: '60px', backgroundColor: "green" }}>
                            <Toolbar sx={{ position: "absolute", left: "10px" }}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose1}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography sx={{ marginLeft: "100px", marginTop: "10px", fontSize: "25px" }}>Pest Controll Solutions</Typography>


                            </Toolbar>
                        </AppBar>
                        <Box>

                            <div className='h-96 rounded-2xl'>
                                <img className='m-auto rounded-2xl' src="./images/logo2.png" alt="" />
                                <div className=' text-center w-1/2 m-auto mt-4'>
                                    <h2 className='max-sm:text-xl text-3xl font-bold text-zinc-600'>See Environment health solutions</h2>
                                    <p className='max-sm:text-sm'>Environmentally healthy pest solutions offer eco-conscious methods to manage infestations without harming ecosystems. By utilizing natural deterrents and sustainable practices, these solutions prioritize the health of both the environment and inhabitants.</p>
                                    <h2 className=' text-lg'>Solutions for {pest}</h2>
                                    <div className='left-0 flex max-sm:flex-wrap w-full absolute m-auto'>
                                        <Card sx={{ maxWidth: 345, backgroundColor: "red", marginLeft: "10px" }} className='m-10'>
                                            <CardMedia
                                                component="img"
                                                alt="green iguana"
                                                height="140"
                                                image="https://img.freepik.com/premium-photo/professional-landscaper-trimming-shrub-with-garden-scissors-background-blurred-copy-space-available_176841-18580.jpg?w=1380"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    First Solution
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <div className='mt-4' dangerouslySetInnerHTML={{ __html: solution1 }} />
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button color='success' size="small">Share</Button>
                                                <Button color='success' size="small" onClick={() => getSolutionDetails(solution1)}>Learn More</Button>
                                            </CardActions>
                                        </Card>
                                        <Card sx={{ maxWidth: 345, backgroundColor: "red", marginLeft: "10px" }} className='m-10'>
                                            <CardMedia
                                                component="img"
                                                alt="green iguana"
                                                height="140"
                                                image="https://img.freepik.com/premium-photo/professional-landscaper-trimming-shrub-with-garden-scissors-background-blurred-copy-space-available_176841-18580.jpg?w=1380"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Second Solution
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <div className='mt-4' dangerouslySetInnerHTML={{ __html: solution2 }} />
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button color='success' size="small">Share</Button>
                                                <Button color='success' size="small" onClick={() => getSolutionDetails(solution2)}>Learn More</Button>
                                            </CardActions>
                                        </Card>
                                        <Card sx={{ maxWidth: 345, backgroundColor: "red", marginLeft: "10px" }} className='m-10'>
                                            <CardMedia
                                                component="img"
                                                alt="green iguana"
                                                height="140"
                                                image="https://img.freepik.com/premium-photo/professional-landscaper-trimming-shrub-with-garden-scissors-background-blurred-copy-space-available_176841-18580.jpg?w=1380"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    Third Solution
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    <div className='mt-4' dangerouslySetInnerHTML={{ __html: solution3 }} />
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button color='success' size="small">Share</Button>
                                                <Button color='success' size="small" onClick={() => getSolutionDetails(solution3)}>Learn More</Button>
                                            </CardActions>
                                        </Card>


                                    </div>
                                </div>

                            </div>
                        </Box>

                    </Dialog>
                </React.Fragment>
                <React.Fragment>

                    <Dialog
                        fullScreen
                        open={openBox2}
                        onClose={handleClose2}
                        TransitionComponent={Transition}
                    >
                        <AppBar sx={{ position: 'relative', height: '60px', backgroundColor: "green" }}>
                            <Toolbar sx={{ position: "absolute", left: "10px" }}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose2}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                                <Typography sx={{ marginLeft: "100px", marginTop: "10px", fontSize: "25px" }}>Pest Controll Solutions</Typography>


                            </Toolbar>
                        </AppBar>
                        <Box>

                            <div className='h-96 rounded-2xl'>
                                <img className=' m-auto rounded-2xl' src="./images/logo2.png" alt="" />
                                <div className='  w-1/2 m-auto mt-4'>
                                    <h2 className='text-center max-sm:text-xl text-3xl font-bold text-zinc-600'>See Environment health solutions</h2>
                                    <p className='text-center max-sm:text-sm'>Environmentally healthy pest solutions offer eco-conscious methods to manage infestations without harming ecosystems. By utilizing natural deterrents and sustainable practices, these solutions prioritize the health of both the environment and inhabitants.</p>
                                    <h2 className='text-center text-xl text-green-600 font-bold'>Solutions for {pest}</h2>
                                    <div className='left-0 flex max-sm:flex-wrap w-full absolute m-auto'>
                                        <div style={{ width: "1000px" }} className='mt-5 w-96 shadow-2xl px-10 m-auto py-5' dangerouslySetInnerHTML={{ __html: solutionDis }} />



                                    </div>
                                </div>

                            </div>
                        </Box>

                    </Dialog>
                </React.Fragment>

            </div >




        </>
    );
}
