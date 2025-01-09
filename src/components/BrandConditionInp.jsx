import React from "react";
import { IoSearch } from "react-icons/io5";
import { useFormContext } from "react-hook-form";

const BrandCondition = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // Accessing register and errors

  return (
    <div className="border-b-2 border-solid border-gray p-5">
      {/* Brand Input */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-0 p-3">
        <div className="w-full md:w-[30%]">
          <h3 className={`${errors.brand ? "text-red-500" : ""}`}>Brand*</h3>
        </div>
        <div className="flex-1">
          <div
            className={`flex items-center px-6 ${
              errors.brand ? "border-red-500" : "border-black"
            }`}
            style={{ borderWidth: "2px" }}
          >
            <IoSearch fontSize={22} />
            <input
              type="text"
              placeholder="Select brand"
              className={`input w-full border-none focus:outline-none active:outline-none ${
                errors.brand ? "text-red-500" : ""
              }`}
              {...register("brand", { required: "Brand is required" })}
            />
          </div>
          <div className="mt-2">
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Condition Input */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-0 p-3">
        <div className="w-full md:w-[30%]">
          <h3 className={`${errors.condition ? "text-red-500" : ""}`}>
            Condition*
          </h3>
        </div>
        <div className="flex-1">
          <div
            className={`flex items-center px-6 ${
              errors.condition ? "border-red-500" : "border-black"
            }`}
            style={{ borderWidth: "2px" }}
          >
            <IoSearch fontSize={22} />
            <input
              type="text"
              placeholder="Select condition"
              className={`input w-full border-none focus:outline-none active:outline-none ${
                errors.condition ? "text-red-500" : ""
              }`}
              {...register("condition", { required: "Condition is required" })}
            />
          </div>
          <div className="mt-2">
            {errors.condition && (
              <p className="text-red-500 text-sm">{errors.condition.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCondition;
