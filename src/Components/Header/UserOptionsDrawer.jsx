/* eslint-disable react/prop-types */
import { useState } from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import useTheme from "../../contexts/theme";
import './UserOptionsDrawer.css';

const drawerWidth = 240;

function UserOptionsDrawer(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { themeMode } = useTheme();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
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

    const listBgColor = (path) => {
        if (location.pathname === path && themeMode === 'dark') return '#292f36 !important';
        else if (location.pathname === path && themeMode === 'light') return '#f0f2f4 !important';
        else return 'transparent';
    };

    const drawer = (
        <div>
            <List>
                <ListItem className="user-title-list-item" disablePadding >
                    <ListItemButton>
                        {/* Shows QBuyDot title image */}
                        <div className="user-title" >
                            <img
                                src="avatar.png"
                                alt="profile"
                                className="user-option-profile-image"
                            ></img>
                            <div>{localStorage.getItem('username').charAt(0).toUpperCase() + localStorage.getItem('username').slice(1)}</div>
                        </div>
                    </ListItemButton>
                </ListItem>
                <>
                    <ListItem onClick={() => navigate('/user-profile')} className="drawer-list-item" disablePadding sx={{ backgroundColor: listBgColor('/user-profile'), }}>
                        <ListItemButton>
                            <div className="header-link">
                                User Profile
                            </div>
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => navigate('/cart')} className="drawer-list-item" disablePadding sx={{ backgroundColor: listBgColor('/cart'), }}>
                        <ListItemButton>
                            <div className="header-link">
                                Cart
                            </div>
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => navigate('/orders')} className="drawer-list-item" disablePadding sx={{ backgroundColor: listBgColor('/orders'), }}>
                        <ListItemButton>
                            <div className="header-link">
                                Orders
                            </div>
                        </ListItemButton>
                    </ListItem>
                    <ListItem className="drawer-list-item" disablePadding onClick={logout} sx={{ backgroundColor: listBgColor('/logout'), }}>
                        <ListItemButton>
                            <div className="header-link">
                                Logout
                            </div>
                        </ListItemButton>
                    </ListItem>
                </>

            </List>
        </div >
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={`user-options-drawer ${themeMode}`}>
            <div className="user-drawer">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerToggle}
                // sx={{ display: { sm: "none" } }}
                >
                    <img
                        src="avatar.png"
                        alt="profile"
                        className="profile-image"
                    />
                </IconButton>
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor="right"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "block", lg: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                            boxShadow: themeMode === 'dark'
                                ? '0px 8px 10px -5px rgba(255,255,255,0.2), 0px 16px 24px 2px rgba(200,200,200,0.01), 0px 6px 30px 5px rgba(255,255,255,0.12)'
                                : '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
                            // Explicitly set the theme-related styles here
                            backgroundColor: themeMode === 'dark' ? '#161b22' : 'white',
                            color: themeMode === 'dark' ? 'white' : 'black',
                            // Add any other styles based on themeMode
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </div>
        </div>
    );
}

UserOptionsDrawer.propTypes = {
    window: PropTypes.func,
};

export default UserOptionsDrawer;
