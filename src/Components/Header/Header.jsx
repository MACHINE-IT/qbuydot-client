/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { Button } from "antd";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import ThemeBtn from '../ThemeBtn/themebtn';
import useTheme from "../../contexts/theme";
import HeaderDrawer from './HeaderDrawer';

const Header = ({ children }) => {
    const navigate = useNavigate();
    const { themeMode } = useTheme();


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
        }
        navigate("/");
    };

    return (
        <div className={`header ${themeMode}`} >
            {/* Show HeaderDrawer for small screens */}
            <HeaderDrawer children={children} className="header-drawer" />

            {/* Show regular Header for larger screens */}
            <div className={`header-normal ${themeMode}`}>
                {/* Shows QBuyDot title image */}
                <div className="header-title" onClick={home} >
                    <img src={themeMode === 'dark' ? 'QBuyDotLogo-newDarkMode.svg' : 'QBuyDotLogo-newLightMode.svg'} alt="QbuyDot-icon"></img>
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
                            </div >
                        </>
                    )}

                </div >
                <ThemeBtn />
            </div >
        </div >
    );
};

export default Header;
