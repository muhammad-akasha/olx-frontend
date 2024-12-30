"use client";

import React, { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [homeNav, setHomeNav] = useState(true);

  return (
    <NavContext.Provider value={{ homeNav, setHomeNav }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => useContext(NavContext);
