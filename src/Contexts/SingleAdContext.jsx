"use client";

import React, { createContext, useContext, useState } from "react";

const SingleAdContext = createContext();

export const SingleAdProvider = ({ children }) => {
  const [ad, setAd] = useState("");

  return (
    <SingleAdContext.Provider value={{ ad, setAd }}>
      {children}
    </SingleAdContext.Provider>
  );
};

export const useSingleAd = () => useContext(SingleAdContext);
