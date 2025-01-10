"use client";

import React, { createContext, useContext, useState } from "react";

const HomeAds = createContext();

export const HomeAdsProvider = ({ children }) => {
  const [ads, setAds] = useState("");

  return (
    <HomeAds.Provider value={{ ads, setAds }}>{children}</HomeAds.Provider>
  );
};

export const useHomeAds = () => useContext(HomeAds);
