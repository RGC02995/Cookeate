import { createContext, useContext, useState } from "react";

// Creamos el contexto fuera del componente ThemeProvider
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Creamos el estado y la función para cambiar el modo oscuro
  const [contextTheme, setContextTheme] = useState("Light");
  const values = { contextTheme, setContextTheme };

  return (
    // Proporcionamos el estado y la función a través del contexto
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};
