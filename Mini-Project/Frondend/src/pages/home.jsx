// import { Button } from '@mui/material'
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axioaClient from '../axios-Client';
import BodyContent from '../components/BodyContent';
import ContactForm from '../components/ContactForm/ContactForm';
import ImageSlider from "../components/ImageSlider/ImageSlider";
import ParallaxContent from '../components/Parallax/ParallaxContent';
import { useStateContext } from '../context/contextProvider';


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
    <div className=' w-full overflow-hidden'>

      {/* <h2 className=''>{translations.home}</h2> */}



      <ImageSlider />
      <BodyContent />
      <ParallaxContent />
      <ContactForm />





    </div>
  )
}
