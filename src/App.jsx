import "antd/dist/reset.css";
import { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// import Checkout from "./components/Checkout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Search from "./components/Search/Search";
// import Thanks from "./components/Thanks";

// import ipConfig from "./ipConfig.json";

export const config = {
  endpoint: `https://qbuydot-backend.onrender.com/v1`,
};

const App = () => {
  const location = useLocation();

  // Scroll to top if path changes
  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Search />} />
        {/* <Route path="/checkout" element={<Checkout />} /> 
        <Route path="/thanks" element={<Thanks />} />   */}
      </Routes>
    </div>
  );
};

export default App;
