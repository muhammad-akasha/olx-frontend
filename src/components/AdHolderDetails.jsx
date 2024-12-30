import React from "react";
import { useFormContext } from "react-hook-form";

const AdHolderDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // Hook to access form methods and errors

  return (
    <div className="p-5">
      {/* Name Input */}
      <div className="flex p-3">
        <div className="w-[30%]">
          <h3 className={`${errors.name ? "text-red-500" : ""}`}>Name*</h3>
        </div>
        <div className="flex-1">
          <div
            className={`flex items-center px-6 ${
              errors.name ? "border-red-500" : "border-black"
            }`}
            style={{ borderWidth: "2px" }}
          >
            <input
              type="text"
              placeholder="Enter Name"
              className={`input w-full border-none focus:outline-none active:outline-none ${
                errors.name ? "text-red-500" : ""
              }`}
              {...register("name", { required: "Name is required" })}
            />
          </div>
          <div className="mt-2">
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Phone Input */}
      <div className="flex p-3">
        <div className="w-[30%]">
          <h3 className={`${errors.phone ? "text-red-500" : ""}`}>
            Mobile Phone Number*
          </h3>
        </div>
        <div className="flex-1">
          <div
            className={`flex items-center px-6 h-14 w-full ${
              errors.phone ? "border-red-500" : "border-black"
            }`}
            style={{ borderWidth: "2px" }}
          >
            <div className="flex justify-between w-[40px] items-center">
              +92 <span className="border-[0.5px] border-black h-5"></span>
            </div>
            <input
              type="number"
              placeholder="Enter Phone Number"
              className={`input w-full border-none outline-none focus:outline-none active:outline-none ${
                errors.phone ? "text-red-500" : ""
              }`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              })}
            />
          </div>
          <div className="mt-2">
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Show Phone Number Checkbox */}
      <div className="flex p-3">
        <div className="w-[30%]">
          <h3>Show My Phone Number in Ad*</h3>
        </div>
        <div className="flex flex-1 items-center justify-end h-14 w-full">
          <input
            type="checkbox"
            className="toggle"
            defaultChecked
            {...register("showPhoneNumber")}
          />
        </div>
      </div>
    </div>
  );
};

export default AdHolderDetails;
