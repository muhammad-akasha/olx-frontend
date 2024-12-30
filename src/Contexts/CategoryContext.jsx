"use client";

import React, { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categoryDetail, setCategoryDetail] = useState(null);

  return (
    <CategoryContext.Provider value={{ categoryDetail, setCategoryDetail }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
