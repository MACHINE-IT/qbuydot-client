import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { useTheme } from '@emotion/react';
import { message } from 'antd';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import "./DeleteUserAccount.css";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { config } from '../../App';

const DeleteUserAccount = () => {
    const { themeMode } = useTheme();
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteUserAccount = async () => {
        try {
            setLoading(true);
            await axios.delete(`${config.endpoint}/users/${localStorage.getItem('userId')}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            setLoading(false);
            setOpenModal(false)
            message.success("Account deleted successfully!")
            logout();
        } catch (e) {
            alert(e);
        }
    }

    const logout = () => {
        for (const key in localStorage) {
            if (key !== 'themeMode') {
                localStorage.removeItem(key);
            }
        }
        navigate("/");
    };

    return (
        <div>
            <Header />
            <div className={`flex-container user-profile-outer-box ${themeMode}`}>
                <div>
                    Delete Your Account
                </div>
                <div>
                    If you are no longer interested in using our services, you can delete your account here.
                    This will delete your account permanently and all you cart and orders also.
                </div>
                <Button type="primary" id="account-delete-button" onClick={() => setOpenModal(true)}>
                    Delete Account
                </Button>
                <Modal className="account-delete-modal" show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body className="account-delete-modal-body">
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete your account?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={deleteUserAccount}>
                                    {"Yes, I'm sure"}
                                </Button>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}

export default DeleteUserAccount