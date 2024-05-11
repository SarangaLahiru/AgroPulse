// import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axioaClient from '../axios-Client';
import { useStateContext } from '../context/contextProvider';
import BodyContent from '../components/BodyContent';
import ContactForm from '../components/ContactForm/ContactForm';
import ParallaxContent from '../components/Parallax/ParallaxContent';
import ImageSlider from '../components/ImageSlider/ImageSlider';
import { Button } from "flowbite-react";
import { Carousel } from "flowbite-react";
import FadeIn from 'react-fade-in';


export default function Home() {



  const [data, setDate] = useState({});
  const { translations } = useStateContext();

  const fetchData = async () => {
    try {
      const response = await axioaClient.get('/data');
      console.log(response)

      toast.success("ok")


    } catch (error) {

      console.log(error)
      console.log("jhvhjv")
      toast.warn("not ok")

    }
  }



  return (
    <div>

      {/* <h2 className=''>{translations.home}</h2> */}



      <ImageSlider />
      <BodyContent />
      <ParallaxContent />
      <ContactForm />





    </div>
  )
}
