import React, { createContext, useState } from 'react';

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [additionalNavbarItems, setAdditionalNavbarItems] = useState([]);

  return (
    <NavbarContext.Provider
      value={{ additionalNavbarItems, setAdditionalNavbarItems }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
