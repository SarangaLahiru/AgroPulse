import React from 'react';

function Item({ title, details }) {
  return (
    <div className="item bg-gradient-to-br from-[#8BC800] from-10% via-[#fff] via-70% to-[#017A04] p-5 rounded-[15px] m-2 max-w-[350px] max-md:max-w-[250px] shadow-3xl hover:scale-105">
      <div className="title text-lg md:text-sm font-bold mb-2">
        <h1>{title}</h1>
      </div>
      <div className="details text-sm md:text-[12px] px-5">
        <p>{details}</p>
      </div>
    </div>
  );
}

export default Item;
