import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { useModal } from "../Contexts/AuthModalContext";

const LoginPage = ({ setIsOpenLogin, setIsOpenCreateAccount }) => {
  const { setIsOpenModal } = useModal();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      <div className="modal-box w-full max-w-md shadow-none p-6 bg-white rounded-md">
        <form method="dialog">
          {/* Close button */}
          <button
            className="btn btn-sm btn-circle btn-ghost fixed right-2 top-2 text-xl"
            onClick={() => setIsOpenModal(false)}
          >
            ✕
          </button>
        </form>
        <h2 className="text-4xl text-center font-extrabold">OLX</h2>
        <p className="py-4 text-2xl font-semibold mt-8">
          Login into your OLX account
        </p>

        {/* Login options */}
        <div className="flex flex-col gap-4 mt-8">
          {/* Google Login Button */}
          <button className="flex items-center justify-center p-2 font-semibold border-2 h-12 border-black hover:border-4 w-full box-border gap-3 rounded-md">
            <FcGoogle size={24} />
            Login with Google
          </button>

          {/* Facebook Login Button */}
          <button className="flex items-center justify-center p-2 font-semibold border-2 h-12 border-black hover:border-4 w-full box-border gap-3 rounded-md">
            <FaFacebook size={24} />
            Login with Facebook
          </button>

          <div>
            <h6 className="text-center text-lg">OR</h6>
          </div>

          {/* Email Login Button */}
          <button
            className="flex items-center justify-center p-2 font-semibold border-2 h-12 border-black hover:border-4 w-full box-border gap-3 rounded-md"
            onClick={() => setIsOpenLogin(true)}
          >
            <MdOutlineEmail size={24} />
            Login with Email
          </button>

          {/* Phone Login Button */}
          <button className="flex items-center justify-center p-2 font-semibold border-2 h-12 border-black hover:border-4 w-full box-border gap-3 rounded-md">
            <LuPhone size={24} />
            Login with Phone
          </button>
        </div>

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
      </div>
    </div>
  );
};

export default LoginPage;
