import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Route, Navigate, Routes } from 'react-router-dom';

function AuthRoute({ children }) {
    const navigate = useNavigate();
    const currentTime = Date.now();
    const localStorageToken = localStorage.getItem("token");

    if (localStorageToken) {
        const decodedToken = jwtDecode(localStorageToken);
        console.log(decodedToken);

        const isAuthenticated = decodedToken.exp * 1000 > currentTime;
        console.log(isAuthenticated)
        if (isAuthenticated) {
            return children;

        }
        else {
            for (const key in localStorage) {
                if (key !== 'themeMode') {
                    localStorage.removeItem(key);
                }
            }
            return <Navigate to="/login" replace />
        }
    } else {
        // If there is no token, redirect to login
        return <Navigate to="/login" replace />;
    }
}

export default AuthRoute;
