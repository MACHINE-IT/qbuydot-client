import React, { useEffect, useState, useRef } from 'react';
import { message, Skeleton, Button, Input } from 'antd';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from 'axios';
import './UserProfile.css';
import { config } from '../../App';
import { useNavigate } from 'react-router';
import Header from '../Header/Header';
import useTheme from '../../contexts/theme';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage, selectProfileImage } from '../../redux/UserSlice';

function UserProfile() {
    const dispatch = useDispatch();
    const userSelectedReduxImage = useSelector(selectProfileImage);
    const { themeMode } = useTheme();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [editName, setEditName] = useState(null);
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [address, setAddress] = useState(localStorage.getItem('address') || '');
    const [editAddress, setEditAddress] = useState(null);
    const [balanceAmount, setBalanceAmount] = useState(localStorage.getItem('balance') || '');
    const [userSelectedImage, setUserSelectedImage] = useState(userSelectedReduxImage || null);
    const [editUserSelectedImage, setEditUserSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const [userProfileImagePath, setUserProfileImagePath] = useState(null);


    useEffect(() => {
        fetchUserDetails();
    }, []);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const saveUserEditHandler = async () => {
        setName(editName || name);
        setAddress(editAddress || address);
        setUserSelectedImage(editUserSelectedImage || userSelectedImage)
        // dispatch(setProfileImage(editUserSelectedImage || userSelectedImage));
        const response = await editUserDetails();
        if (response) {
            const imageUrl = `${config.fileEndpoint}/${response.data.profileImagePath}`;
            dispatch(setProfileImage(imageUrl));
        }
        cancelUserEditHandler();
    }

    const cancelUserEditHandler = () => {
        toggleEditing();
        setEditName(null);
        setEditAddress(null);
        setEditUserSelectedImage(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name.toLowerCase();
            if (!fileName.endsWith('.png') && !fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg')) {
                message.error('Please select a valid PNG, JPG, or JPEG image file.');
                // Clear the file input
                fileInputRef.current.value = null;
                return;
            }
            setEditUserSelectedImage(file);
            console.log(`user ki image file hai bhai: `, file);
        }
    }

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

    const editUserDetails = async () => {
        let response = {};
        let errored = false;
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('name', editName || name);
            formData.append('address', editAddress || address);
            if (editUserSelectedImage || userSelectedImage) {
                formData.append('profileImage', editUserSelectedImage || userSelectedImage);
            }

            response = await axios.patch(`${config.endpoint}/users/${userId}`,
                formData,
                {
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
            setUserProfileImagePath(response.data.profileImagePath);
            dispatch(setProfileImage(`${config.fileEndpoint}/${response.data.profileImagePath}`));
            setUserSelectedImage(`${config.fileEndpoint}/${response.data.profileImagePath}`)
            message.success("Updated successfully!")
            return response;
        }
    }

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
            setUserProfileImagePath(response.data.profileImagePath);
            dispatch(setProfileImage(`${config.fileEndpoint}/${response.data.profileImagePath}`));
            setUserSelectedImage(`${config.fileEndpoint}/${response.data.profileImagePath}`)
            return response;
        }
    }
    return (
        <>
            < Header />
            <div className={`flex-container user-profile-outer-box ${themeMode}`}>
                <div className="user-profile">
                    <div id="user-profile-user-title" >
                        {loading ? <Skeleton.Avatar size="large" style={{ width: 100, height: 100 }} loading={loading} active avatar />
                            : (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="image-upload-input"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleImageChange(e)}
                                        ref={fileInputRef}
                                    />
                                    <label htmlFor="image-upload-input">
                                        <div id="user-profile-image-container">
                                            <img
                                                src={editUserSelectedImage ? URL.createObjectURL(editUserSelectedImage) : (userSelectedImage || userProfileImagePath ? userSelectedImage : 'avatar.png')}
                                                alt="profile"
                                                id="user-profile-image"
                                                width="100"
                                                height="100"
                                            />
                                        </div>
                                        {isEditing && <Button type="primary" id="user-image-edit-button" onClick={() => fileInputRef.current.click()}>
                                            <EditOutlinedIcon id="user-image-edit-icon" style={{ fontSize: '18px' }} />
                                            <span>Edit</span>
                                        </Button>}
                                    </label>
                                </>
                            )}
                    </div>

                    <div className="user-profile-child-div">
                        <div><strong>Name</strong></div>
                        <div>
                            {/* {isEditing ? ( */}
                            {loading ? <Skeleton.Input active size="small" style={{ width: 300 }} />
                                : <Input
                                    className={`user-input ${isEditing ? 'user-input-editable' : ''}`}
                                    value={editName || name}
                                    onChange={(e) => setEditName(e.target.value)}
                                    readOnly={!isEditing}
                                />}
                            {/* ) :
                                (
                                    <span>{loading ? <Skeleton.Input active size="small" style={{ width: 100 }} />
                                        : name}</span>
                                )} */}
                        </div>
                    </div>
                    <div className="user-profile-child-div">
                        <div><strong>Email</strong></div>
                        <div>{loading ? <Skeleton.Input active size="small" style={{ width: 300 }} />
                            : <Input
                                className="user-input-email"
                                value={email}
                                disabled={true}
                            />}</div>
                    </div >
                    <div className="user-profile-child-div">
                        <div><strong>Address</strong></div>
                        <div id="user-edit-textarea">
                            {/* {isEditing ? ( */}
                            {loading ? <Skeleton.Input active size="small" style={{ width: 300, height: 80 }} />
                                : <Input.TextArea
                                    className={`user-input ${isEditing ? 'user-input-editable' : ''}`}
                                    id="address-edit-textarea"
                                    value={editAddress || address}
                                    onChange={(e) => setEditAddress(e.target.value)}
                                    autoSize={{ minRows: 3, maxRows: 5, }}
                                    readOnly={!isEditing}
                                />}
                            {/* // ) :
                            //     (<span>{loading ? <Skeleton.Input active size="small" style={{ width: 300 }} />
                            //         : address}</span>
                            //     )} */}
                        </div>
                    </div>
                    <div className="user-profile-child-div">
                        <div><strong>Balance Amount</strong></div>
                        <div>{loading ? <Skeleton.Input active size="small" style={{ width: 300 }} />
                            : (<>₹ {balanceAmount}</>)
                        }</div>
                    </div>
                    <div className="edit-save-buttons">
                        {isEditing ? (
                            <>
                                <Button id="save-button" type="primary" onClick={saveUserEditHandler}>
                                    Save
                                </Button>
                                <Button id="cancel-button" onClick={cancelUserEditHandler}>Cancel</Button>
                            </>
                        ) : (
                            !loading && <Button type="primary" onClick={toggleEditing}>
                                Edit Details
                            </Button>
                        )}
                    </div>
                </div>

            </div >
            <Footer />
        </>
    )
}

export default UserProfile;