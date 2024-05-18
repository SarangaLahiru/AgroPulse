import React from 'react';

function Item({ title, details }) {
  return (
    
    <div className="item1 bg-gradient-to-br from-[#8BC800] from-20% to-[#fff] p-5 rounded-[15px] md:max-w-[300px] lg:max-w-[350px] shadow-3xl hover:scale-105 mt-[40px]">
      <div className="title text-center text-[#017A04] text-[24px] md:text-[24px] lg:text-[24px] font-bold mb-2">
        <h1>{title}</h1>
      </div>
      <div className="details text-center text-black text-[14px] lg:text-[14px] md:text-[12px]  px-5">
        <p>{details}</p>
      </div>
    </div>

// Breakpoint prefix	Minimum width	CSS
// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }
  );
}

export default Item;
