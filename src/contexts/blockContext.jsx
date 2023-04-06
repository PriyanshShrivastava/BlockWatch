import React, { createContext, useContext, useEffect, useState } from "react";
const Block = createContext();

const BlockContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setCurrencySymbol("₹");
    else if (currency === "USD") setCurrencySymbol("$");
  }, [currency]);
  return (
    <Block.Provider value={{ currency, currencySymbol, setCurrency }}>
      {children}
    </Block.Provider>
  );
};

export const CryptoState = () => {
  return useContext(Block);
};

export default BlockContext;
