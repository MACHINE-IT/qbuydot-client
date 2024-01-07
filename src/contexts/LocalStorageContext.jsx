import { createContext, useContext, useEffect, useState } from 'react';

const LocalStorageContext = createContext();

export const LocalStorageProvider = ({ children }) => {
    // State to hold the local storage data
    const [token, setToken] = useState(() => {
        // Initialize with data from local storage or default values
        const storedData = localStorage.getItem('yourLocalStorageKey');
        return storedData ? JSON.parse(storedData) : { /* default values */ };
    });

    // Effect to update local storage when state changes
    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token));
        alert(`token change ho gaya bhaiya!`)
    }, [token]);

    return (
        <LocalStorageContext.Provider value={{ token, setToken }}>
            {children}
        </LocalStorageContext.Provider>
    );
};

export const useLocalStorage = () => {
    const context = useContext(LocalStorageContext);
    if (!context) {
        throw new Error('useLocalStorage must be used within a LocalStorageProvider');
    }
    return context;
};
