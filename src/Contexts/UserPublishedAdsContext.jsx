"use client";

import React, { createContext, useContext, useState } from "react";

const UserPublishedAdsContext = createContext();

export const UserAdsProvider = ({ children }) => {
  const [myads, setMyads] = useState("");

  return (
    <UserPublishedAdsContext.Provider value={{ myads, setMyads }}>
      {children}
    </UserPublishedAdsContext.Provider>
  );
};

export const useUserAds = () => useContext(UserPublishedAdsContext);
