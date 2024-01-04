import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useTheme from '../../contexts/theme';
import './themeButton.css';
import { useEffect, useState } from 'react';

function ThemeBtn() {

    const { themeMode, lightTheme, darkTheme } = useTheme();
    const [darkModeStatus, setDarkModeStatus] = useState(false);


    const onChangeBtn = (e) => {
        const darkModeStatus = e.currentTarget.checked
        if (darkModeStatus) {
            darkTheme()
        } else {
            lightTheme()
        }
    }

    const onChangeBtnNew = () => {
        // console.log(themeMode)
        // const darkModeStatus = themeMode === 'light' ? false : true;
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
            {/* <label className="themeToggleButton relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onChange={onChangeBtn}
                    checked={themeMode === 'dark'}
                /> */}
            {/* <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black-600"></div> 
        </label >*/}

        </>
    );
}

export default ThemeBtn