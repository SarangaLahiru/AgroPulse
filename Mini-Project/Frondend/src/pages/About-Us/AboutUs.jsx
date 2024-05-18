import React, { useRef, useEffect } from 'react';
import ImageOne from "../../assets/AboutUs/about-us cover.jpg";
import { useStateContext } from '../../context/contextProvider';
import Item from './Item'; // Import the Item component
import Section from './Section'; // Import the Section component
import { FaArrowDown } from "react-icons/fa";
import Aos from 'aos';
import 'aos/dist/aos.css';

function AboutUs() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const { setTranslations, translations } = useStateContext();
  const secondContainerRef = useRef(null);

  const itemsData = [
    { title: translations.itemsData_Title1, details: translations.itemsData_Details1 },
    { title: translations.itemsData_Title2, details: translations.itemsData_Details2 }, //translations.itemsData_Details2
    { title: translations.itemsData_Title3, details: translations.itemsData_Details3 }, //translations.itemsData_Details3
  ];

  const technologyItems = [
    { label: translations.technology_Label1, text: translations.technology_Text1 }, 
    { label: translations.technology_Label2, text: translations.technology_Text2 }, 
    { label: translations.technology_Label3, text: translations.technology_Text3 }, 
    { label: translations.technology_Label4, text: translations.technology_Text4 }, 
  ];

  const featuresItems = [
    { label: translations.features_Label1, text: translations.features_Text1 }, 
    { label: translations.features_Label2, text: translations.features_Text2 },
  ];

  const impactItems = [
    { label: translations.impactLabel1 },
    { label: translations.impactLabel2 },
    { label: translations.impactLabel3 },
  ];

  const futureGoalsItems = [
    { label: translations.futureGoals_Label1 }, 
    { label: translations.futureGoals_Label2 }, 
    { label: translations.futureGoals_Label3 }, 
  ];

  const scrollToSecondContainer = () => {
    secondContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="relative heroContent">
        <div className="heroImg relative">
          <img src={ImageOne} alt="About Us Cover" className="h-auto w-full object-cover" />
          <div className="content absolute top-0 left-0 right-0 flex flex-col items-center justify-start max-sm:justify-center pt-20 max-sm:pt-0 lg:pt-10 p-4 text-white h-full">
            <h1 className="text-[36px] md:text-[46px] xl:text-[56px] font-bold text-shadow-lg" data-aos='fade-up' data-aos-duration='4000'>About Us</h1>
            <p className="mt-2 text-center text-[14px] md:text-[16px] xl:text-[24px] text-shadow-sm" data-aos='fade-up' data-aos-duration='4000'>Learn more about our journey and mission.</p>

            <div className="container mx-auto p-4 flex justify-around flex-wrap max-lg:hidden lg:flex-nowrap lg:gap-10 lg:pt-0 cursor-pointer" data-aos='fade-up' data-aos-duration='3000'>
              {itemsData.map((item, index) => (
                <Item key={index} title={item.title} details={item.details} />
              ))}
            </div>

            <button
              onClick={scrollToSecondContainer}
              className="mt-4 p-2 bg-gray-800 bg-opacity-50 rounded-full text-white hover:bg-opacity-75 hover:scale-105" data-aos='fade-up' data-aos-duration='3000'
            >
              <FaArrowDown className='size-8 max-md:size-6' />
            </button>

            <div className="hiddenText text-center max-xl:hidden" data-aos='fade-up' data-aos-duration='3000'>
              <h1 className='mt-10 text-[50px] font-[600] text-shadow-lg'>AgroPulse</h1>
              <p className="mt-2 text-[24px]">Empowering Farmers with Innovative Pest Management Solutions</p>
            </div>

          </div>
        </div>
      </div>

      <div ref={secondContainerRef} className='pb-10'>
        <div className="container mx-auto p-4 flex justify-around flex-wrap lg:hidden overflow-hidden" data-aos='fade-up' data-aos-duration='3000'>
          {itemsData.map((item, index) => (
            <Item key={index} title={item.title} details={item.details} />
          ))}
        </div>

        <div className=''>
        <div data-aos='fade-up'>
          <Section
            title="Our Technology"
            subtitle="AgroPulse utilizes state-of-the-art technologies to provide farmers with reliable and precise tools for pest management. Our platform integrates:"
            items={technologyItems}
          />
        </div>

        <div data-aos='fade-up'>
          <Section 
            title="Our Features"
            subtitle="Currently, AgroPulse offers two key features:"
            items={featuresItems}
          />
        </div>

        <div data-aos='fade-up'>
          <Section 
            title="Our Impact"
            subtitle="AgroPulse is dedicated to making a significant impact on the agricultural community. Our application helps farmers:"
            items={impactItems}
          />
        </div>

        <div data-aos='fade-up'>
          <Section 
            title="Our Goals"
            subtitle="We are committed to continuous innovation and expansion. Our future plans include:groPulse is dedicated to making a significant impact on the agricultural community. Our application helps farmers:"
            items={futureGoalsItems}
          />
        </div>
        </div>

        
      </div>
    </div>
  );
}

export default AboutUs;
