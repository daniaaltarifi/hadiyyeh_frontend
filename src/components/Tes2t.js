import React, { useState } from 'react';
import "../Css/rightCart.css";
import { Image, Modal, Button } from 'react-bootstrap'; // Import Modal and Button
import slider1 from '../images/WATCHES3.jpg';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';

const RightCart = ({ cartItems, isCanvasOpen, toggleCanvas }) => {
    const isEmpty = cartItems.length === 0;
    const [theme] = useThemeHook();
    const [showGiftModal, setShowGiftModal] = useState(false);

    // Function to open the modal
    const handleGiftClick = () => {
        setShowGiftModal(true);
    };

    // Function to close the modal
    const handleClose = () => {
        setShowGiftModal(false);
    };

    return (
        <div
            className={`offcanvas offcanvas-end ${isCanvasOpen ? 'show' : ''} ${theme ? 'bg-dark-custom' : 'bg-light-custom'}`}
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
            style={isCanvasOpen ? { display: 'block' } : {}}
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Your Cart</h5>
                <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={toggleCanvas}
                ></button>
            </div>
            <div className="offcanvas-body">
                {isEmpty ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul className="list-group">
                        {cartItems.map((item, index) => (
                            <li
                             key={index}
                             className={`list-group-item d-flex flex-column custom-list-item ${theme ? 'bg-light-black text-light' : 'bg-light text-black'}`}>
                                <div className="d-flex align-items-center justify-content-between">
                                    {/* Image */}
                                    <Image
                                        src={slider1}
                                        className="img-fluid img-card"
                                        alt="First slide"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                    />
                                    {/* Title and Price */}
                                    <div className="d-flex justify-content-between w-100">
                                        <span>{item.name}</span>
                                        <span>${item.price.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* "Is this a gift?" button */}
                                <button
                                    className={`btn btn-link mt-2 text-decoration-none ${theme ? '' : 'text-dark'}`}
                                    onClick={handleGiftClick}
                                >
                                    Is this a gift?
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Modal for "Is this a gift?" */}
            <Modal show={showGiftModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Gift option information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Would you like to add a gift message or gift wrap for this item?</p>
                    {/* Additional gift options can be added here */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RightCart;
