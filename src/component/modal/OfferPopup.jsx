import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const OfferPopup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const showOfferPopup = () => {
      MySwal.fire({
        title: <p>Special Offer</p>,
        text: "Get 20% off on your first order! Use code: FIRST20 at checkout.",
        confirmButtonText: 'Close',
      }).then(() => {
        // Redirect to the home page after the popup is closed
        navigate('/');
      });
    };

    // Check if the offer has already been shown in this session
    const offerShown = sessionStorage.getItem('offerShown');

    if (!offerShown) {
      showOfferPopup();
      sessionStorage.setItem('offerShown', 'true'); // Set flag in sessionStorage
    }
  }, [navigate]);

  return null;
};

export default OfferPopup;
