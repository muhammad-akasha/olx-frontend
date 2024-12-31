import React from "react";

const EditPageInput = ({ placeholder, register, name, type }) => {
  return (
    <input
      {...register(name)}
      type={type || "text"}
      placeholder={placeholder}
      className="input input-bordered input-info w-full max-w-[50%] mt-4 focus:outline-none"
    />
  );
};

export default EditPageInput;
