/* eslint-disable react/prop-types */
import { Button } from "antd";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import ThemeBtn from '../ThemeBtn/themebtn';
import useApplyTheme from "../useApplyTheme/useApplyTheme";

const Header = ({ children }) => {
    const navigate = useNavigate();
    // Initialize theme mode from localStorage or default to 'light'
    const themeMode = localStorage.getItem("themeMode") || "light";


    const home = () => {
        navigate("/products");
    };

    const explore = () => {
        navigate("/products");
    };

    const register = () => {
        navigate("/register");
    };

    const login = () => {
        navigate("/login");
    };

    const logout = () => {
        for (const key in localStorage) {
            if (key !== 'themeMode') {
                localStorage.removeItem(key);
            }
        };
        navigate("/");
    };

    return (
        <div className={`header ${themeMode}`} >
            {/* Shows QBuyDot title image */}
            <div className="header-title" onClick={home} >
                <img src="QBuyDotLogo-new.svg" alt="QbuyDot-icon"></img>
            </div>

            {children}

            {/* Display links based on if the user's logged in or not */}
            <div className="header-action">
                {localStorage.getItem("username") ? (
                    <>
                        <img
                            src="avatar.png"
                            alt="profile"
                            className="profile-image"
                        ></img>

                        <div className="header-info">
                            {localStorage.getItem("username")}
                        </div>

                        <Button type="primary" onClick={logout}>
                            Logout
                        </Button>
                        <ThemeBtn />
                    </>
                ) : (
                    <>
                        <div className="header-link" onClick={explore}>
                            Explore
                        </div>

                        <div className="header-link" onClick={login}>
                            Login
                        </div>

                        <div className="header-link">
                            <Button type="primary" onClick={register}>
                                Register
                            </Button>
                            <ThemeBtn />
                        </div>
                    </>
                )}

            </div>
        </div >
    );
};

export default Header;
