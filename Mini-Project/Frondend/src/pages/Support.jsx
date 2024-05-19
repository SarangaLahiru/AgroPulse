import React from 'react'
import SupportDetail from '../components/SupportDetail/SupportDetail'
import img1 from "../assets/Support/Card1.png"
import img2 from "../assets/Support/Card2.png"
import img3 from "../assets/Support/Card3.png"
import FaqAccordion from '../components/Accordion/Accordion'
import { useStateContext } from "../context/contextProvider";





function Support() {
  const btnStyle = {
    backgroundColor: 'rgba(1, 95, 3, 1)',
    
  
    
  };
  const { setTranslations, translations } = useStateContext();

  
  return (
    <div className="m-1">
        <h2 className="font-semibold text-xl text-center pt-6  md:text-2xl md:pt-7 xl:text-3xl xl:text-left xl:px-20 xl:pt-10 " >{translations.Support_1}</h2>
        <h3 className="text-3xl text-center font-bold md:text-4xl xl:text-left xl:text-5xl mx-20 text-green-700" >{translations.Support_2}</h3>
       



    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 m-20 " >
      <SupportDetail
        title={translations.Support_3t1}
        content={translations.Support_3c1}
        imageSrc={img1}
      />
      <SupportDetail
        title={translations.Support_3t2}
        content={translations.Support_3c2}
        imageSrc={img2}
      />
      <SupportDetail
        title={translations.Support_3t3}
        content={translations.Support_3c3}
        imageSrc={img3}
      />
      
    
    </div>

    <div className="border-2 rounded-xl xl:px-20 xl:m-20 border-green-700 xl:pb-20
    md:px-15 md:m-15 md:pb-15
    px-10 m-10 pb-10
     " >
        <h2 className="xl:text-2xl font-bold xl:pt-10  xl:my-2 xl:mb-14 xl:text-left
        md:text-2xl md:pt-8  md:my-1 md:mb-10 md:text-center
        mt-8 text-center mb-4"
        >{translations.Support_3t2}</h2>
            <FaqAccordion
             topic={translations.Support_act1}
             details={translations.Support_acc1}/>

             <FaqAccordion
             topic={translations.Support_act2}
             details={translations.Support_acc2}/>


              <FaqAccordion
             topic={translations.Support_act3}
             details={translations.Support_acc3}/>


              <FaqAccordion
             topic={translations.Support_act4}
             details={translations.Support_acc4}/>


              <FaqAccordion
             topic={translations.Support_act5}
             details={translations.Support_acc5}/>
             

    </div>
    
    <button className="h-16 w-40 float-right rounded-full text-white xl:mb-20 xl:mx-20 
    md:mx-15 md:mb-15 mx- mb-10" style={btnStyle} >
  {translations.Support_btn}
</button>

    </div>
    
  )

}

export default Support