import React from 'react'
import SupportDetail from '../components/SupportDetail/SupportDetail'
import img1 from "../assets/Support/Card1.png"
import img2 from "../assets/Support/Card2.png"
import img3 from "../assets/Support/Card3.png"
import FaqAccordion from '../components/Accordion/Accordion'
import { Margin } from '@mui/icons-material'





function Support() {
  const btnStyle = {
    backgroundColor: 'rgba(1, 95, 3, 1)',
    
  
    
  };
  
  return (
    <div className="m-1">
        <h2 className="font-semibold text-xl text-center pt-6  md:text-2xl md:pt-7 xl:text-3xl xl:text-left xl:px-20 xl:pt-10 " >GET SUPPORT FOR YOUR AGROPULSE EXPERIENCE</h2>
        <h3 className="text-3xl text-center font-bold md:text-4xl xl:text-left xl:text-5xl mx-20 text-green-700" >Support</h3>
       



    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 m-20 " >
      <SupportDetail
        title="Get Assistance When You Need It"
        content="Discover helpful resources and reach out for support to ensure a seamless AgroPulse experience."
        imageSrc={img1}
      />
      <SupportDetail
        title="FAQs (Frequently Asked Questions)"
        content="Explore common queries to find quick solutions and insights about AgroPulse."
        imageSrc={img2}
      />
      <SupportDetail
        title="User Guides and Tutorials"
        content="Unlock the full potential of AgroPulse with step-by-step guides and tutorials."
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
        
        >FAQs (Frequently Asked Questions)</h2>
            <FaqAccordion
             topic="How do I create an account on AgroPulse?"
             details="To create an account on AgroPulse, simply click on the 'Sign Up' button on the homepage and follow the prompts to enter your details, such as your name, email address, and password. Once you've completed the registration process, you'll be able to access all the features of AgroPulse."/>

             <FaqAccordion
             topic="What types of crops does AgroPulse support?"
             details="We take data security and privacy seriously at AgroPulse. Your data is encrypted and stored securely on our servers, and we adhere to industry best practices to protect it from unauthorized access or misuse. For more information about our data security measures, please refer to our Privacy Policy.
             "/>


              <FaqAccordion
             topic="How secure is my data on AgroPulse?"
             details="We take data security and privacy seriously at AgroPulse. Your data is encrypted and stored securely on our servers, and we adhere to industry best practices to protect it from unauthorized access or misuse. For more information about our data security measures, please refer to our Privacy Policy.
             "/>


              <FaqAccordion
             topic="Can I use AgroPulse on mobile devices?"
             details="Yes, AgroPulse is optimized for use on both desktop and mobile devices. You can access our web app using your smartphone or tablet's web browser to monitor your fields, view predictions, and manage your account on the go.
             "/>


              <FaqAccordion
             topic="How can I provide feedback or suggestions for improving AgroPulse?"
             details="We value your feedback and welcome suggestions for improving AgroPulse. You can share your feedback by filling out the feedback form on the Support page or by contacting our support team directly. We appreciate your input and use it to make AgroPulse better for all users"/>
             

    </div>
    
    <button className="h-16 w-40 float-right rounded-full text-white xl:mb-20 xl:mx-20 
    md:mx-15 md:mb-15 mx- mb-10" style={btnStyle} >
  More
</button>

    </div>
    
  )

}

export default Support