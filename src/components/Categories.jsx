import Image from "next/image";
import { categories } from "../categoriesarrays/categoriesArray";

const Categories = () => {
  return (
    <div className="mt-3 flex gap-x-[52px] gap-y-2 flex-wrap lg font-semibold">
      {categories.map((category, index) => (
        <div key={index} className="w-24 flex flex-col items-center">
          <Image src={category.src} alt={category.alt} width={85} height={85} />
          <h2 className="mt-2 text-center">{category.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default Categories;
