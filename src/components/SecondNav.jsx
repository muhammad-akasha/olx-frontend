import React from "react";

const SecondNav = () => {
  return (
    <header className="px-2 md:px-8 border-t-[1px] py-4 border-[#d8dfe0]">
      <ul className="flex gap-4 text-sm flex-wrap">
        <li className="font-semibold text-md cursor-pointer">ALL CATEGORIES</li>
        <li className="cursor-pointer">Mobile Phones</li>
        <li className="cursor-pointer">Cars</li>
        <li className="cursor-pointer">Motorcycles </li>
        <li className="cursor-pointer">Houses</li>
        <li className="cursor-pointer">Video-Audios</li>
        <li className="cursor-pointer">Tablets</li>
        <li className="cursor-pointer">Lands & Plots</li>
      </ul>
    </header>
  );
};

export default SecondNav;
