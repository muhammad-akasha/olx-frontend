"use client";
import React, { useState } from "react";
import { useModal } from "../Contexts/AuthModalContext.jsx";
import LoginPage from "./LoginPage.jsx";
import LoginWithEmail from "./LoginWithEmail.jsx";
import CreateAccount from "./CreateAccount.jsx";

const AuthModal = () => {
  const { isOpenModal } = useModal();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenCreateAcc, setIsOpenCreateAccount] = useState(false);

  return (
    <>
      {isOpenModal && (
        <>
          <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 z-[21]"></div>
          {!isOpenLogin && !isOpenCreateAcc && (
            <>
              <LoginPage
                setIsOpenLogin={setIsOpenLogin}
                setIsOpenCreateAccount={setIsOpenCreateAccount}
              />
            </>
          )}
          {isOpenLogin && !isOpenCreateAcc && (
            <LoginWithEmail
              setIsOpenLogin={setIsOpenLogin}
              setIsOpenCreateAccount={setIsOpenCreateAccount}
            />
          )}
          {!isOpenLogin && isOpenCreateAcc && (
            <CreateAccount
              setIsOpenCreateAccount={setIsOpenCreateAccount}
              setIsLoginOpen={setIsOpenLogin}
            />
          )}
        </>
      )}
    </>
  );
};

export default AuthModal;
