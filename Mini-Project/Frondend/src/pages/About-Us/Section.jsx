import React from 'react';

const Section = ({ title, subtitle, items }) => {
  return (
    <div className="max-w-md mx-auto mt-4 bg-gradient-to-br from-[#8BC800] from-20% to-[#fff] rounded-xl drop-shadow-md overflow-hidden md:max-w-2xl max-md:max-w-xl max-sm:max-w-[300px] cursor-pointer">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-lg max-sm:text-[16px] max-md:text-[20px] lg:text-[22px] text-[#017A04] font-bold cursor-pointer">{title}</div>
          <h4 className="block mt-1 text-[16px] max-sm:text-[14px] max-md:text-[16px] lg:text-[20px] leading-tight font-medium text-black hover:underline cursor-pointer">{subtitle}</h4>
          {items.map((item, index) => (
            <li key={index} className='mx-10 mt-2 text-[14px] max-sm:text-[12px] max-md:text-[14px] lg:text-[16px] text-slate-700 list-none hover:text-[#000] cursor-pointer'>
              <span className='font-[600]'>{item.label}</span> {item.text}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
