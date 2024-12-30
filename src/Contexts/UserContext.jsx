"use client";

import React, { createContext, useContext, useState } from "react";

const loggedInUserContext = createContext();

export const LoginUserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState("");

  return (
    <loggedInUserContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </loggedInUserContext.Provider>
  );
};

export const useAuthenticate = () => useContext(loggedInUserContext);
