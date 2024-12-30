import { useCategory } from "../Contexts/CategoryContext";
import Image from "next/image";
import React from "react";

const Category = () => {
  const { categoryDetail } = useCategory();

  return (
    <section className="flex p-6 justify-between border-b-2 border-solid border-gray">
      <div>
        <strong>Category</strong>
      </div>
      <div className="w-[70%]">
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center ">
            <div>
              <Image
                width={50}
                height={50}
                src={categoryDetail.src}
                alt={categoryDetail.alt}
              />
            </div>
            <div>
              <h5 className="font-semibold">{categoryDetail.title}</h5>
              <h6 className="text-sm">{categoryDetail.category}</h6>
            </div>
          </div>
          <div>
            <h6 className="text-blue-600">Change</h6>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
