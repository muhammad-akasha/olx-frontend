"use client";
import { useModal } from "../Contexts/AuthModalContext";
import { useAuthenticate } from "../Contexts/UserContext";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoChevronBackOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { saveAccessToken } from "../axios-api-intersectors/api";

const LoginWithEmail = ({ setIsOpenLogin, setIsOpenCreateAccount }) => {
  const { setIsOpenModal } = useModal();
  const { setIsLogin } = useAuthenticate();
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onSubmit = (data) => {
    setLoading(true);
    const { email, password } = data;
    axios
      .post(
        "http://localhost:8000/api/v1/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setIsLogin(res.data.data);
        setIsOpenModal(false);
        setIsOpenCreateAccount(false);
        saveAccessToken(res.data.accessToken);
      })
      .catch((err) => {
        setErr(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30">
      <div className="modal-box w-[27rem] h-[650px] shadow-none bg-white rounded-md relative">
        <h2 className="text-4xl text-center font-extrabold">OLX</h2>
        <p className="py-4 text-2xl font-semibold mt-8">Log in with Email</p>
        <form method="dialog">
          {/* Close button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2 text-xl"
            onClick={() => {
              setIsOpenLogin(false);
            }}
          >
            <IoChevronBackOutline />
          </button>
        </form>
        <form method="dialog">
          {/* Close button */}
          <button
            className="btn btn-sm btn-circle btn-ghost fixed right-2 top-2 text-xl"
            onClick={() => {
              setIsOpenModal(false);
              setIsOpenLogin(false);
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

          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="#" className="text-blue-500">
              Forgot your password?
            </a>
          </div>

          {err && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <p className="text-sm">{err}</p>
            </div>
          )}

          {/* Log In Button */}
          <button
            type="submit"
            className="w-full p-2 font-semibold border-2 border-black hover:border-4 h-12 rounded-md mt-4"
          >
            {loading ? "logging..." : "Log in"}
          </button>

          {/* OR Section */}
          <div className="flex items-center my-4">
            <hr className="w-full" />
            <span className="mx-2 text-lg">OR</span>
            <hr className="w-full" />
          </div>

          {/* Password-Free Login Button */}
          <button className="w-full p-2 font-semibold border-2 border-black hover:border-4 h-12 rounded-md mb-4">
            Log in with a one-time link
          </button>

          {/* Sign up link */}
          <p className="text-center mt-8 text-sm">
            New to OLX?{" "}
            <a
              onClick={() => {
                setIsOpenCreateAccount(true), setIsOpenLogin(false);
              }}
              href="#"
              className="text-blue-500 font-semibold"
            >
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginWithEmail;
