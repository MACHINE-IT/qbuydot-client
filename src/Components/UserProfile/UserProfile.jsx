import React, { useEffect, useState } from 'react';
import { message, Skeleton } from 'antd';
import axios from 'axios';
import './UserProfile.css';
import { config } from '../../App';
import { useNavigate } from 'react-router';
import Header from '../Header/Header';
import useTheme from '../../contexts/theme';

function UserProfile() {
    const { themeMode } = useTheme();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [address, setAddress] = useState(localStorage.getItem('address') || '');
    const [balanceAmount, setBalanceAmount] = useState(localStorage.getItem('balance') || '');

    useEffect(() => {
        fetchUserDetails();
    }, []);


    const logout = () => {
        for (const key in localStorage) {
            if (key !== 'themeMode') {
                localStorage.removeItem(key);
            }
        }

        navigate('/login');
    };

    const validateResponse = (errored, response) => {
        if (errored) {
            message.error(
                "Could not get User Profile."
            );
            return false;
        } else if (response.message) {
            if (response.code == '401') {
                message.error(`Your session is Expired. Please login again!`);
                logout();
            }
            message.error(response.message);
            return false;
        }

        return true;
    };

    const fetchUserDetails = async () => {
        let response = {};
        let errored = false;
        try {
            setLoading(true);
            response = await axios.get(`${config.endpoint}/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLoading(false);
        } catch (e) {
            errored = true;
        }
        if (validateResponse(errored, response)) {
            console.log(response.data)
            setName(response.data.name.split('')[0].toUpperCase() + response.data.name.slice(1));
            setAddress(response.data.address);
            return response;
        }
    }
    return (
        <>
            < Header />
            <div className={`flex-container user-profile-outer-box ${themeMode}`}>
                <div className="user-profile">
                    <div className="user-profile-child-div">
                        <strong style={{ marginRight: '10px' }}>Name: </strong>
                        {loading ? <Skeleton.Input active size="small" style={{ width: 100 }} />
                            : name}
                    </div>
                    <div className="user-profile-child-div">
                        <strong>Email:</strong> <div style={{ marginLeft: '10px' }}>{email}</div>
                    </div >
                    <div className="user-profile-child-div">
                        <strong style={{ marginRight: '10px' }}>Address: </strong>
                        {loading ? <Skeleton.Input active size="small" style={{ width: 300 }} />
                            : address}
                    </div>
                    <div className="user-profile-child-div">
                        <strong>Balance Amount:</strong> <div style={{ marginLeft: '10px' }}>&#x20b9; {balanceAmount}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile