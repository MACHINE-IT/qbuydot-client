import { createContext, useContext } from "react";
console.log("contextApi mein h bhai konsi theme", localStorage.getItem('themeMode'));
export const ThemeContext = createContext({
    themeMode: localStorage.getItem("themeMode") || 'light',
    darkTheme: () => { },
    lightTheme: () => { },
});

export const ThemeProvider = ThemeContext.Provider;


export default function useTheme() {
    return useContext(ThemeContext);
}

