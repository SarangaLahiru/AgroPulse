import { RoundedCorner } from '@mui/icons-material';
import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Carousel } from 'flowbite-react';
import "./ImageSlider.css"
import ImageOne from "../images/img2.jpg";
import ImageSecond from "../images/hgic_food gardening_colorado-potato-beetle-582966_1920.jpg";
import ImageTird from "../images/123.jpg";

const ImageSlider = () => {
  return (
    <div data-aos="fade-down" className="h-56 sm:h-64 xl:h-80 2xl:h-96 mt-4">
    <Carousel>
      
      <img src={ImageOne} alt="..."/>
      <img src={ImageSecond} alt="..."/>
      <img src={ImageTird} alt="..."/>
    
      </Carousel>
  </div>
  )
}

export default ImageSlider
