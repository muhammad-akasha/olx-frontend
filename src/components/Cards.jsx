import Image from "next/image";
import React from "react";
import { FaRegHeart } from "react-icons/fa";

const Cards = ({ price, title, timeSincePosted, location, image }) => {
  return (
    <div className="border-[0.1rem] border-solid border-[rgba(0,47,52,0.2)] rounded-[0.4rem] cursor-pointer overflow-hidden relative select-none w-[302px] h-[314px] bg-white">
      <div className="w-full h-[50%]">
        <img
          src={image[0] || `/iphone.webp`}
          alt="iphone"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center">
          <strong>Rs: {price}</strong>
          <FaRegHeart fontSize={22} />
        </div>
        <div>
          <p>{title}</p>
        </div>
        <div className="flex flex-col mt-3">
          <div>
            <h6 className="text-[14px] text-[#406367]">{location}</h6>
          </div>
          <div>
            <h5 className="text-[12px] text-[#406367]">{timeSincePosted}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
