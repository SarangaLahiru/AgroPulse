import React from 'react'
import './PestImageUpload.css'
import FadeIn from 'react-fade-in';

export default function PestImageUpload() {
  return (
   <FadeIn>
     <div className='mt-20'>
      
      <FadeIn>
      <div className="box mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ml-5 mt-10 text-3xl">
        <h2 className='sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl max-sm:text-xl' >DETECT PEST IN YOUR FIELD TO PROTECT CROP </h2>
        <h1 className='sm:text-4xl md:text-4xl lg:text-6xl xl:text-6xl 2xl:text-6xl max-sm:text-4xl'>Pest Detection</h1>
        </div>
      </FadeIn>
       
       
       <div className="box1 w-full relative">
            <img className=' -z-10 m-auto max-sm:p-5 2xl:scale-110 2xl:mt-8' width="1280px"  src="./images/Rectangle 26.png" alt="" />
        
          <div className="dis w-full m-auto z-40 absolute  max-sm:top-12 max-md:top-32 max-lg:top-40 max-xl:top-56 2xl:top-52 max-2xl:top-72">
                <h2 className='m-auto w-fit text-2xl p-5 text-teal-50'>Drag or upload an image</h2>
                <img className='m-auto max-sm:w-14  max-md:w-20 max-lg:w-24 max-xl:28' src="./images/Group 6.png" alt="" />
            </div>
          
            <div className="btn max-sm:m-5 sm:m-20 flex">
                <div className="btn1 cursor-pointer active:scale-75 hover:drop-shadow-xl w-20 rounded-full">
                <img src="./images/Group 5.png" className='' alt="" />
                </div>
                <div className="btn2 absolute max-sm:right-5 sm:right-20 sm:text-xl">
                    <button className='sm:m-4 max-sm:m-1 bg-green-800 text-green-50 max-sm:p-3 max-sm:px-6 sm:p-3 sm:px-8 active:scale-75 hover:drop-shadow-xl rounded-full'>Detect</button>
                    <button className='sm:m-4 max-sm:m-1 bg-green-800 text-green-50 max-sm:p-3 max-sm:px-6 sm:p-3 sm:px-9 active:scale-75 hover:drop-shadow-xl  rounded-full'>Back</button>
                </div>
            </div>
        </div>
       

        <img src="./images/logo2.png" className='w-fit m-auto max-sm:w-48' alt="" />

      
    </div>
   </FadeIn>
  )
}
