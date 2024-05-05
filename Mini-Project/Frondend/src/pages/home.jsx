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

      <div data-aos="fade-up" className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-4">
        <Carousel>
          <img src="https://img.freepik.com/free-photo/close-up-mosquitoes-nature_23-2151365340.jpg?t=st=1714902583~exp=1714906183~hmac=4b1f72f5c78c2d916475a68d2a62c82462cce7aac82838273fba88ed8c882969&w=1380" alt="..." />
          <img src="https://img.freepik.com/free-photo/close-up-mosquito-nature_23-2151365359.jpg?t=st=1714902662~exp=1714906262~hmac=e945aa819df73eb9b9bf9b69cb50357d462f59c2b167a00442a5b56308a8c878&w=1380" alt="..." />
          <img src="https://img.freepik.com/free-photo/small-weevil-crawls-green-leaf-outdoors-generated-by-ai_188544-39182.jpg?t=st=1714902730~exp=1714906330~hmac=4848bd0ae62f5d6bb1756515b0b593862203b9215ba270f0c613f704e11bc2a0&w=1380" alt="..." />
          <img src="https://img.freepik.com/free-photo/small-yellow-fly-green-leaf-nature-beauty-generative-ai_188544-12838.jpg?t=st=1714902963~exp=1714906563~hmac=7ba5695ff0b57c898be020390ba8e0d09a55c3c8864a8541b55e1ba8d1393ad4&w=1380" alt="..." />
          <img src="https://img.freepik.com/free-photo/realistic-ladybug-nature_23-2150417245.jpg?t=st=1714903148~exp=1714906748~hmac=164708c289d27bae37c48c7b3b98bb20968c74d3ec434d072caf4349ff924795&w=1380" alt="..." />
        </Carousel>
      </div>

      {/* <ImageSlider /> */}
      <BodyContent />
      <ParallaxContent />
      <ContactForm />





    </div>
  )
}
