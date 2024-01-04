import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useTheme from '../../contexts/theme';
import './themeButton.css';
import { useState } from 'react';

function ThemeBtn() {

    const { themeMode, lightTheme, darkTheme } = useTheme();
    const [darkModeStatus, setDarkModeStatus] = useState(false);

    const onChangeBtnNew = () => {
        setDarkModeStatus(!darkModeStatus);
        console.log(darkModeStatus)
        if (darkModeStatus) {
            darkTheme()
        } else {
            lightTheme()
        }
    }

    console.log(darkModeStatus)
    return (
        <>
            <div onClick={() => onChangeBtnNew()}>
                <IconButton sx={{ ml: 1 }} color="inherit">
                    {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </div>

        </>
    );
}

export default ThemeBtn