
import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null; 
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Unauthorized Access</h2>
                <p className="modal-message">You are not a user. Please sign up.</p>
                <div className="modal-buttons">
                    <button className="modal-button confirm" onClick={onConfirm}>Sign Up</button>
                    <button className="modal-button cancel" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
