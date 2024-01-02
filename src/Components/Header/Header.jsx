/* eslint-disable react/prop-types */
import { Button } from "antd";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = ({ children }) => {
    const navigate = useNavigate();


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
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="header">
            {/* Shows Qkart title image */}
            <div className="header-title" onClick={home}>
                <img src="icon.svg" alt="QKart-icon"></img>
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
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
