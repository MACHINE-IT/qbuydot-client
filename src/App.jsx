import "antd/dist/reset.css";
import { useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Checkout from "./Components/Checkout/Checkout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Search from "./Components/Search/Search";
import Thanks from "./Components/Thanks/Thanks";
import { ThemeProvider } from './contexts/theme'
import { useEffect } from 'react'
import AuthRoute from "./AuthRoute/AuthRoute";
import { jwtDecode } from "jwt-decode";

export const config = {
  endpoint: `https://qbuydot-backend.onrender.com/v1`,
};

const App = () => {

  // Scroll to top if path changes
  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  }, [location.pathname]);

  // Initializing theme mode from localStorage or default to 'light'
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  // const [themeMode, setThemeMode] = useState('light')

  const darkTheme = () => {
    setThemeMode('dark')
  }

  const lightTheme = () => {
    setThemeMode('light')
  }

  useEffect(() => {
    // document.querySelector('html').classList.remove('dark', "light");
    // document.querySelector('html').classList.add(themeMode);

    document.querySelectorAll('html, .header-normal, .header-drawer, .product-info, .search-cart, .cart, .item-cart-info, .cart-parent, .availableBalance, .total').forEach(element => {
      element.classList.remove('dark', 'light');
      element.classList.add(themeMode);
    });

  }, [themeMode])

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<AuthRoute><Search /> </AuthRoute>} />
          <Route path="/checkout" element={<AuthRoute><Checkout /></AuthRoute>} />
          <Route path="/thanks" element={<AuthRoute><Thanks /></AuthRoute>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;