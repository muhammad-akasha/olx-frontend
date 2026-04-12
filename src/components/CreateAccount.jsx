"use client";
import { useModal } from "../Contexts/AuthModalContext";
import { useAuthenticate } from "../Contexts/UserContext";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";

const CreateAccount = ({ setIsOpenCreateAccount, setIsLoginOpen }) => {
  const { setIsOpenModal } = useModal();
  const { setIsLogin } = useAuthenticate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    const { name, email, password, profilePicture } = data;
    const profileObj = {};
    profileObj.fullName = name;
    profileObj.email = email;
    profileObj.password = password;
    const url = await uploadImageToCloudinary(profilePicture);
    profileObj.image = url;

    axios
      .post("https://olx-backend-deploy.vercel.app/api/v1/register", profileObj)
      .then((res) => {
        if (res.status === 200) {
          axios
            .post("https://olx-backend-deploy.vercel.app/api/v1/login", {
              email,
              password,
            })
            .then((res) => {
              console.log(res);
              setIsLogin(res.data.data);
              setIsOpenModal(false);
              setIsOpenCreateAccount(false);
            })
            .catch((err) => setErr(err.response.data.message))
            .finally(() => setLoading(false));
        }
      })
      .catch((err) => setErr(err.response.data.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className="modal-box w-[27rem] h-[750px] shadow-none bg-white rounded-md relative">
        <h2 className="text-4xl text-center font-extrabold">OLX</h2>
        <p className="py-4 text-2xl font-semibold mt-8">Create Account</p>
        <form method="dialog">
          {/* Back Button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2 text-xl"
            onClick={() => {
              setIsOpenCreateAccount(false);
            }}
          >
            <IoChevronBackOutline />
          </button>
        </form>
        <form method="dialog">
          {/* Close Button */}
          <button
            className="btn btn-sm btn-circle btn-ghost fixed right-2 top-2 text-xl"
            onClick={() => {
              setIsOpenModal(false);
              setIsOpenCreateAccount(false);
            }}
          >
            ✕
          </button>
        </form>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-8"
        >
          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Please enter your name.",
              })}
              className="p-2 border-2 border-black w-full h-12 rounded-md focus:outline-none focus:border-[#23E5DB]"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Please enter your e-mail address.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email address.",
                },
              })}
              className="p-2 border-2 border-black w-full h-12 rounded-md focus:outline-none focus:border-[#23E5DB]"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Please enter your password.",
              })}
              className="p-2 border-2 border-black w-full h-12 rounded-md focus:outline-none focus:border-[#23E5DB]"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Profile Picture Field */}
          <div className="flex flex-col">
            <label htmlFor="profilePicture" className="font-semibold">
              Profile Picture
            </label>
            <input
              accept="image/png, image/gif, image/jpeg"
              id="profilePicture"
              type="file"
              {...register("profilePicture", {
                required: "Please upload your profile picture.",
              })}
              className="p-2 border-2 border-black w-full h-12 rounded-md focus:outline-none focus:border-[#23E5DB]"
            />
            {errors.profilePicture && (
              <span className="text-red-500 text-sm">
                {errors.profilePicture.message}
              </span>
            )}
          </div>

          {err && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <p className="text-sm">{err}</p>
            </div>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full p-2 font-semibold border-2 border-black hover:border-4 h-12 rounded-md mt-4"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* OR Section */}
          <div className="flex items-center my-4">
            <hr className="w-full" />
            <span className="mx-2 text-lg">OR</span>
            <hr className="w-full" />
          </div>

          {/* Login Link */}
          <p className="text-center mt-8 text-sm">
            Already have an account?{" "}
            <a
              onClick={() => {
                setIsOpenCreateAccount(false), setIsLoginOpen(true);
              }}
              href="#"
              className="text-blue-500 font-semibold"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
