import React from 'react';
const  customShadowStyle= {
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.9)'
  };

function SupportDetail({ title, content, imageSrc }) {
  return (
    <div className="md:w-300 md:h-380xl:w-359 xl:h-463 bg-white rounded-xl overflow-hidden lg:flex " style={customShadowStyle}>
      <div className="flex flex-col justify-center items-center h-full ">
       
        <h2 className=" text-xl xl:text-2xl font-bold  mb-2 text-center xl:p-10 p-5" >{title}</h2>
        <img src={imageSrc} alt={title} className="
         w-full h-auto mb-2
        xl:w-full xl:h-auto xl:mb-4" />
        <p className="text-base font-semibold text-center xl:mx-20 xl:py-6 m-6" >{content}</p>
      </div>
    </div>
  );
}

export default SupportDetail;
