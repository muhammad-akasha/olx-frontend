import Image from "next/image";
import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const CategoryBox = ({ src, alt, title }) => {
  return (
    <div className="flex w-[415px] p-2 rounded-md justify-between items-center border-2 h-[80px] hover:bg-[#c8f8f6] border-[rgba(0, 47, 52, .36)]">
      <div className="flex gap-2 items-center">
        <Image src={src} alt={alt} width={55} height={55} />
        {title}
      </div>
      <MdOutlineArrowForwardIos fontSize={20} />
    </div>
  );
};

export default CategoryBox;
