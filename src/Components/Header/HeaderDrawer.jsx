import * as React from "react";
import PropTypes from "prop-types";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import ThemeBtn from '../ThemeBtn/themebtn';
import useTheme from "../../contexts/theme";
import './HeaderDrawer.css';

const drawerWidth = 240;

function HeaderDrawer(props) {
    const navigate = useNavigate();
    const { themeMode } = useTheme();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

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

    const drawer = (
        <div>
            <List>
                {/* Shows QBuyDot title image */}
                <div className="header-title" onClick={home} >
                    <img src={themeMode === 'dark' ? 'QBuyDotLogo-newDarkMode.svg' : 'QBuyDotLogo-newLightMode.svg'} alt="QbuyDot-icon"></img>
                </div>
            </List>
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <div className="header-drawer">
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: "none" } }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            >
                {drawer}
            </Drawer>
        </div>
    );
}

HeaderDrawer.propTypes = {
    window: PropTypes.func,
};

export default HeaderDrawer;
