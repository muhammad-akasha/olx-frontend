"use client";
import { useModal } from "../Contexts/AuthModalContext";
import React, { useEffect } from "react";

const LoginBtn = () => {
  const { isOpenModal, setIsOpenModal } = useModal();

  return (
    <a
      className="border-b-2 hover:border-opacity-0 border-black font-semibold text-md"
      href=""
      onClick={(e) => {
        e.preventDefault();
        setIsOpenModal(!isOpenModal);
      }}
    >
      Login
    </a>
  );
};

export default LoginBtn;
