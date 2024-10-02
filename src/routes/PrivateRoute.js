// PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '../component/Modal'; // Import your modal component

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirm = () => {
        closeModal();
        // Redirect to the authForm page
        navigate('/authForm');
    };

    // Check if the user is not logged in or not authorized
    useEffect(() => {
        if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
            openModal(); // Open modal for unauthorized access
        }
    }, [user, allowedRoles]); // Run effect whenever user or allowedRoles changes

    // If the modal is open, we don't want to render the Outlet
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

    // Render the Outlet only if the user is authorized
    return <Outlet />;
};

export default PrivateRoute;
