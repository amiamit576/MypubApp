
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
    };

    const handleConfirm = () => {
        closeModal();
      
        navigate('/authForm');
    };

 
    useEffect(() => {
        if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
            openModal(); 
        }
    }, [user, allowedRoles]); 

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
