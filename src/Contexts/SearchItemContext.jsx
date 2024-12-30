"use client";

import React, { createContext, useContext, useState } from "react";

const searchedContext = createContext();

export const SearchProvider = ({ children }) => {
  const [data, setData] = useState("");

  return (
    <searchedContext.Provider value={{ data, setData }}>
      {children}
    </searchedContext.Provider>
  );
};

export const useSearched = () => useContext(searchedContext);
