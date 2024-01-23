/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, List } from "antd";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import ThemeBtn from '../ThemeBtn/themebtn';
import useTheme from "../../contexts/theme";
import HeaderDrawer from './HeaderDrawer';
import UserProfile from "../UserProfile/UserProfile";
import UserOptionsDrawer from './UserOptionsDrawer';
// import { ShoppingCartOutlined } from '@mui/icons-material';

const Header = ({ children }) => {
    const navigate = useNavigate();
    const { themeMode } = useTheme();
    const [showList, setShowList] = useState(false); // State to manage list visibility
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
        // Toggle the list visibility when the drawer is clicked
        setShowList(!showList);
    };

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
                            <ThemeBtn />
                            {/* <div>
                                <img
                                    src="avatar.png"
                                    alt="profile"
                                    className="profile-image"
                                    onClick={toggleList}
                                ></img>
                            </div> */}
                            {/* Conditional rendering of the list based on the state */}
                            <UserOptionsDrawer />


                            {/* <div className="link" onClick={navigate('/cart')}>
                                <div className='cart-icon'>
                                    {
                                        cart.length ? <div className='cart-count'>{countItemsInBag(cart)}</div> : null
                                    }
                                    <ShoppingCartOutlined />
                                </div>
                            </div> */}
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
                            <ThemeBtn />
                        </>
                    )}

                </div >

            </div >
        </div >
    );
};

export default Header;
