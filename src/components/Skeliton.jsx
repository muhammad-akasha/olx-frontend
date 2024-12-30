import React from "react";

const Skeliton = () => {
  return (
    <div className="flex flex-col gap-4">
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="flex w-full h-52 flex-row gap-4">
            <div className="w-[43%]">
              <div className="skeleton h-full w-full"></div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="skeleton h-4 w-52"></div>
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-4 w-36"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Skeliton;
