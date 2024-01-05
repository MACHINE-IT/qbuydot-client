import { Button } from "antd";
import { Link } from "react-router-dom";
import "./Home.css";
import useTheme from "../../contexts/theme";
import ThemeBtn from "../ThemeBtn/themebtn";
import Footer from "../Footer/Footer";

const Home = () => {
    // const themeMode = localStorage.getItem("themeMode") || "light";
    const { themeMode } = useTheme();
    return (
        <>
            <div className="theme-buttom">
                <ThemeBtn />
            </div>
            {/* Display "Home" page content */}
            <div className={`flex-container ${themeMode}`}>
                <div className="home-container container">
                    <h1 className="home-welcome-text">
                        Welcome to &nbsp;<strong>QBuyDot</strong>
                    </h1>
                    <p>
                        Where you can find all you need to shop at precise one Dot!
                    </p>

                    <br /><br /><br />
                    <p>Please select an option from below to continue</p>

                    <div className="home-buttons">

                        <Link to="/login">
                            <Button
                                id="login-button"
                                className="btn-block"
                                type="primary"
                                block={true}
                            >
                                Login
                            </Button>
                        </Link>

                        <Link to="/register">
                            <Button
                                id="register-button"
                                className="btn-block"
                                type="primary"
                                block={true}
                            >
                                Register
                            </Button>
                        </Link>

                        <Link to="/products">
                            <Button className="btn-block" type="primary" block={true}>
                                Browse Products
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
