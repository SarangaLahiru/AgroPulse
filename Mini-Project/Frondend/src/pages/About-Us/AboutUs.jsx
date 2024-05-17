import React, { useRef } from 'react';
import { useEffect } from 'react';
import ImageOne from "../../assets/AboutUs/about-us cover.jpg";
import { useStateContext } from '../../context/contextProvider';
import Item from './Item'; // Import the Item component
import { FaArrowDown } from "react-icons/fa";

import Aos from 'aos';
import 'aos/dist/aos.css';

function AboutUs() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const { setTranslations, translations } = useStateContext();
  const secondContainerRef = useRef(null);

  const itemsData1 = [
    { title: "Mission", details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores obcaecati in consequatur, explicabo nesciunt mollitia earum amet excepturi id quo illum libero, soluta autem dicta incidunt? Ea maxime debitis quaerat?" },
    { title: "Vision", details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores obcaecati in consequatur, explicabo nesciunt mollitia earum amet excepturi id quo illum libero, soluta autem dicta incidunt? Ea maxime debitis quaerat?" },
    { title: "Values", details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores obcaecati in consequatur, explicabo nesciunt mollitia earum amet excepturi id quo illum libero, soluta autem dicta incidunt? Ea maxime debitis quaerat?" },
  ];

  const itemsData2 = [
    { title: "Hello", details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores obcaecati in consequatur, explicabo nesciunt mollitia earum amet excepturi id quo illum libero, soluta autem dicta incidunt? Ea maxime debitis quaerat?" },
    { title: "Vision", details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores obcaecati in consequatur, explicabo nesciunt mollitia earum amet excepturi id quo illum libero, soluta autem dicta incidunt? Ea maxime debitis quaerat?" },
    { title: "Values", details: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores obcaecati in consequatur, explicabo nesciunt mollitia earum amet excepturi id quo illum libero, soluta autem dicta incidunt? Ea maxime debitis quaerat?" },
  ];

  const scrollToSecondContainer = () => {
    secondContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative heroContent">
      <div className="heroImg relative">
        <img src={ImageOne} alt="About Us Cover" className="h-auto w-full object-cover" />
        <div className="content absolute top-0 left-0 right-0 flex flex-col items-center justify-start max-sm:justify-center pt-40 max-sm:pt-0 p-4 text-white h-full">
          <h1 className="sm:text-[30px] md:text-[36px] xl:text-[56px] font-bold" data-aos='fade-up' data-aos-duration='4000'>About Us</h1>
          <p className="mt-2 text-center sm:text-[12px] md:text-[18px] xl:text-[24px]" data-aos='fade-up' data-aos-duration='4000'>Learn more about our journey and mission.</p>

          

          <div className="container mx-auto p-4 flex justify-around flex-wrap text-black max-lg:hidden " data-aos='fade-up' data-aos-duration='3000'>
            {itemsData1.map((item, index) => (
              <Item key={index} title={item.title} details={item.details} />
            ))}
          </div>
          <button
            onClick={scrollToSecondContainer}
            className="mt-4 p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 hover:scale-105" data-aos='fade-up' data-aos-duration='3000'
          >
            <FaArrowDown className='size-8'/>
          </button>

        </div>
      </div>

      <div ref={secondContainerRef} className="container mx-auto p-4 flex justify-around flex-wrap" data-aos='fade-up' data-aos-duration='3000'>
        {itemsData2.map((item, index) => (
          <Item key={index} title={item.title} details={item.details} />
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
