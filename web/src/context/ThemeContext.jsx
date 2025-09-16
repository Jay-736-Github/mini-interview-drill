import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {
  const getInitialMode = () => {
    const savedMode = localStorage.getItem("appThemeMode");
    return savedMode === "dark" ? "dark" : "light"; 
  };

  const [mode, setMode] = useState(getInitialMode);
  useEffect(() => {
    localStorage.setItem("appThemeMode", mode);
  }, [mode]);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => useContext(ThemeContext);