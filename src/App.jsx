import "antd/dist/reset.css";
import { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './redux/store';

import Checkout from "./Components/Checkout/Checkout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Search from "./Components/Search/Search";
import Thanks from "./Components/Thanks/Thanks";

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
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Search />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </div>
    //   </PersistGate>
    // </Provider>
  );
};

export default App;
