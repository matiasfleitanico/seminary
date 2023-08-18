import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [globalRoute, setGlobalRoute] = useState(''); // Estado inicial

  return (
    <GlobalContext.Provider value={{ globalRoute, setGlobalRoute }}>
      {children}
    </GlobalContext.Provider>
  );
};