import { UploadFile } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, CardActions, CardContent, CardMedia, Dialog, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Toolbar from '@mui/material/Toolbar';
import axios from 'axios';
import { Card } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import FadeIn from 'react-fade-in';
import { FourSquare } from 'react-loading-indicators';
import { useNavigate } from 'react-router-dom';
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
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [solution1, setSolution1] = useState('')
    const [solution2, setSolution2] = useState('')
    const [solution3, setSolution3] = useState('')
    const [sinhalasolution1, sinhalasetSolution1] = useState('')
    const [sinhalasolution2, sinhalasetSolution2] = useState('')
    const [sinhalasolution3, sinhalasetSolution3] = useState('')
    const [credit, setCredit] = useState(0);
    const [solutionDis, setSolutionDis] = useState('')
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const navigate = useNavigate();

    React.useEffect(() => {

        const user = JSON.parse(localStorage.getItem('USER'));
        if (user && user.credit) {
            setCredit(user.credit);
            console.log(credit)
            // localStorage.setItem('USER', JSON.stringify(user));
        }
    }), [];
    const updateCreditInDB = async (newCredit) => {
        try {
            const user = JSON.parse(localStorage.getItem('USER'));
            await axioaClient.post('/update_credit', { id: user.id, credit: newCredit });
            console.log('Credit updated in DB');
        } catch (error) {
            console.error('Error updating credit:', error);
        }
    };
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
        setLoading(true)

        const user = JSON.parse(localStorage.getItem('USER'));

        if (user.credit > 0) {

            axioaClient.post('/detection', formData)

                .then(response => {
                    const user = JSON.parse(localStorage.getItem('USER'));

                    if (user) {
                        user.credit -= 1;



                        // setCredit(user.credit);
                        localStorage.setItem('USER', JSON.stringify(user));

                    }

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
                    console.log(details)
                    setSolution1(solution1)
                    setSolution2(solution2)
                    setSolution3(solution3)
                    if (translations.language == "si") {
                        translateText(details);
                        translateText1(solution1);
                        translateText2(solution2);
                        translateText3(solution3);
                    }


                    const prediction = response.data.result;
                    updateCreditInDB(user.credit);

                    setLoading(false)

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
                            setOpenBox(true);


                        } else if (result.isDenied) {
                            Swal.fire("Changes are not saved", "", "info");
                        }
                    });
                })



                .catch(error => {
                    console.error('Error uploading image:', error);
                    setLoading(false)
                    Swal.fire({
                        title: "Internal server Error",
                        icon: "error",
                        text: "Try again later",
                        showCancelButton: true,
                        customClass: {
                            container: 'my-custom-modal-class'   // Custom class for the deny button
                        }
                    });

                });
        }
        else {

            setLoading(false)
            setCredit(0);
            localStorage.setItem('USER', JSON.stringify(user));
            setIsDialogOpen(true)
        }
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
        setLoading(true)
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
                if (translations.language == "si") {
                    translateText4(dis);

                }

                setLoading(false)
            })
            .catch(error => {
                setLoading(false)

            });


    }
    const seeSolutions = () => {
        setOpenBox1(true)


    }

    // if (loading) {
    //     return <div className=' z-50 bg-red-100 m-auto w-fit' style={{ zIndex: "100" }}><CircularProgress /></div>
    // }

    const translateText = async (text) => {

        console.log(text)


        const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            data: {
                text: text,
                source: 'en',
                target: 'si'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setDetails(response.data.translations.translation)
            // translateText1();

        } catch (error) {
            console.log(error.message);
        }
    }
    const translateText1 = async (solution1) => {
        console.log()
        const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            data: {
                text: solution1,
                source: 'en',
                target: 'si'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            sinhalasetSolution1(response.data.translations.translation)
            // translateText2();
        } catch (error) {
            setError(error.message);
        }
    }
    const translateText2 = async (solution2) => {

        const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            data: {
                text: solution2,
                source: 'en',
                target: 'si'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            sinhalasetSolution2(response.data.translations.translation)
            // translateText3();
        } catch (error) {
            setError(error.message);
        }
    }
    const translateText3 = async (solution3) => {
        const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            data: {
                text: solution3,
                source: 'en',
                target: 'si'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            sinhalasetSolution3(response.data.translations.translation)
        } catch (error) {
            setError(error.message);
        }
    }
    const translateText4 = async (solutionDis) => {
        const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '10fcccfb6cmsh981231964b47270p154337jsnc4303618bd52',
                'X-RapidAPI-Host': 'translate-plus.p.rapidapi.com'
            },
            data: {
                text: solutionDis,
                source: 'en',
                target: 'si'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setSolutionDis(response.data.translations.translation)
        } catch (error) {
            console.log(error.message);
        }
    }

    console.log(translations.language)



    return (
        <>
            {loading ? (
                <div className='w-fit'>
                    <div className=' fixed top-0' style={{ backgroundColor: "white", width: "100%", height: "100vh", zIndex: "1000" }}>
                        <div className='relative top-80 w-20 m-auto'>
                            <FourSquare color="#32cd32" size="large" text="Loading..." />
                        </div>
                    </div>
                </div>

            ) :




                < div >
                    <FadeIn>


                        <div className='mt-20'>
                            <FadeIn>
                                <div className="box mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ml-16 mt-10 text-3xl">
                                    <h2 className='sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl max-sm:text-xl' >{translations.detection_p1}</h2>
                                    <h1 className='sm:text-4xl md:text-4xl lg:text-6xl xl:text-6xl 2xl:text-6xl max-sm:text-4xl'>{translations.detection_p2}</h1>
                                </div>
                            </FadeIn>

                            <div className="box1 w-full relative " onDrop={handleDrop} onDragOver={handleDragOver}>
                                <label htmlFor="fileUpload" className="file-upload">{imageUrl ? (
                                    <img className='img -z-10 m-auto max-xl:w-full max-md:w-full max-sm:w-full max-lg:w-full max-sm:p-5 max-md:p-5 max-lg:p-5 max-xl:p-5 2xl:scale-110 2xl:mt-8' width="1280px" src={imageUrl} alt="" />
                                ) : (
                                    <img className='img -z-10 m-auto max-xl:w-full max-md:w-full max-sm:w-full max-lg:w-full max-sm:p-5 max-md:p-5 max-lg:p-5 max-xl:p-5 2xl:scale-110 2xl:mt-8' width="1280" src="./images/Rectangle 26.png" alt="" />
                                )}
                                    <div className="dis w-full m-auto z-40 absolute max-sm:top-12 max-md:top-32 max-lg:top-40 max-xl:top-56 2xl:top-52 max-2xl:top-72">
                                        <h2 className='name m-auto w-fit text-2xl max-sm:p-6 p-10 text-teal-50'>{file ? file.name : translations.detection_t1}</h2>
                                        <img className='upload m-auto max-sm:-mt-4 max-sm:w-14 max-md:w-20 max-lg:w-24 max-xl:28' src="./images/Group 6.png" alt="" />
                                    </div>
                                </label>
                                <input className=' bg-black' type="file" id="fileUpload" style={{ display: "none" }} onChange={handleFileChange} />

                                <div className="btn max-sm:m-5 sm:m-40 sm:mt-20 flex">
                                    <div className="btn1 cursor-pointer active:scale-75 hover:drop-shadow-xl w-10 rounded-full">
                                        <img onClick={handleTakePhoto} src="./images/Group 5.png" className=' relative -left-3' alt="" />
                                    </div>
                                    <div className="btn2 absolute max-sm:right-5 sm:right-20 sm:text-xl">
                                        <button className='sm:m-4 max-sm:m-1 bg-green-800 text-green-50 max-sm:p-3 max-sm:px-2 sm:p-3 sm:px-8 active:scale-75 hover:drop-shadow-xl rounded-full' onClick={handleDetect}>{translations.detection_b1}</button>
                                        <button className='sm:m-4 max-sm:m-1 bg-green-800 text-green-50 max-sm:p-3 max-sm:px-2 sm:p-3 sm:px-9 active:scale-75 hover:drop-shadow-xl  rounded-full' onClick={handleBack}>{translations.detection_b2}</button>
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
                                        <Button onClick={seeSolutions} color='success' sx={{ marginTop: "50px", backgroundColor: "green", color: "white" }}>See solutions</Button>
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
                                            <Card sx={{ Width: '345px', backgroundColor: "red", marginLeft: "10px" }} className='m-10'>
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
                                                        {translations.language == 'si' ? (<div className='mt-4' dangerouslySetInnerHTML={{ __html: sinhalasolution1 }} />) : (<div className='mt-4' dangerouslySetInnerHTML={{ __html: solution1 }} />)}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button color='success' size="small">Share</Button>
                                                    <Button color='success' size="small" onClick={() => getSolutionDetails(solution1)}>Learn More</Button>
                                                </CardActions>
                                            </Card>
                                            <Card sx={{ Width: '345px', backgroundColor: "red", marginLeft: "10px" }} className='m-10'>
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
                                                        {translations.language == 'si' ? (<div className='mt-4' dangerouslySetInnerHTML={{ __html: sinhalasolution2 }} />) : (<div className='mt-4' dangerouslySetInnerHTML={{ __html: solution2 }} />)}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button color='success' size="small">Share</Button>
                                                    <Button color='success' size="small" onClick={() => getSolutionDetails(solution2)}>Learn More</Button>
                                                </CardActions>
                                            </Card>
                                            <Card sx={{ Width: '345px', backgroundColor: "red", marginLeft: "10px" }} className='m-10'>
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
                                                        {translations.language == 'si' ? (<div className='mt-4' dangerouslySetInnerHTML={{ __html: sinhalasolution3 }} />) : (<div className='mt-4' dangerouslySetInnerHTML={{ __html: solution3 }} />)}
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
                                        {url && <iframe width="1280" height="720" src="https://www.youtube.com/embed/ox7gSxYZwEU?autoplay=1" className='m-auto' style={{ width: "600px", height: "400px", borderRadius: "24px" }} frameborder="0" allowfullscreen></iframe>}
                                        <div className='left-0 flex max-sm:flex-wrap w-full absolute m-auto'>
                                            <div style={{ width: "1000px" }} className='mt-5 w-96 shadow-2xl px-10 m-auto py-5' dangerouslySetInnerHTML={{ __html: solutionDis }} />



                                        </div>
                                    </div>

                                </div>
                            </Box>

                        </Dialog>
                    </React.Fragment>

                </div >


            }
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 mr-4">
                                <svg
                                    className="h-12 w-12 text-yellow-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Credit Limit</h3>
                                <div className="mt-2 text-sm text-gray-600">
                                    Your credit limit is <span className="text-yellow-500 font-bold">{credit}</span>.
                                </div>
                                <div className="mt-2 text-sm text-gray-600">
                                    Upgrade to <span className="text-yellow-500 font-bold">Premiere Plan</span> for more benefits!
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                OK
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
                                onClick={() => alert('Go Premiere Plan')}
                            >
                                Go Premiere Plan
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}
