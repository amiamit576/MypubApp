import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '../component/Modal'; 

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/');  // Redirect to home page on cancel
    };

    const handleConfirm = () => {
        closeModal();
        navigate('/authForm');  // Redirect to the sign-up form on confirmation
    };

    useEffect(() => {
        if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
            openModal(); 
        }
    }, [user, allowedRoles]);

    if (isModalOpen) {
        return (
            <>
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    onConfirm={handleConfirm} 
                />
            </>
        );
    }

    return <Outlet />;
};

export default PrivateRoute;
