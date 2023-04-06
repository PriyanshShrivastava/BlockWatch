import React, { createContext, useContext, useEffect, useState } from "react";
const Theme = createContext();

const ThemeContext = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <Theme.Provider value={{ theme, setTheme }}>{children}</Theme.Provider>
  );
};

export const ThemeState = () => {
  return useContext(Theme);
};

export default ThemeContext;
