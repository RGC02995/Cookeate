import { createContext, useState } from "react";

// Creamos el contexto fuera del componente ThemeProvider
export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Creamos el estado y la función para cambiar el modo oscuro
  const [darkMode, setDarkMode] = useState(false);

  return (
    // Proporcionamos el estado y la función a través del contexto
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
