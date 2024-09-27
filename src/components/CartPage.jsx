import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/CartPage.css'; // Optional: Add your styles here

const CartPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product, imageUrl, orderDetails } = location.state || {};

    // Parse the properties if they are in string format
    const properties = orderDetails?.properties ? JSON.parse(orderDetails.properties) : {};

    const handleBackToHome = () => {
        navigate('/'); // Adjust this to your home route
    };

    return (
        <div className="cart-container">
            <h1 className="cart-title">Cart Page</h1>
            {product ? (
                <div className="cart-item">
                    <img src={imageUrl} alt={product.productDescription} className="cart-item-image" />
                    <div className="cart-item-details">
                        <p><strong>Product Name:</strong> {product.productName}</p> {/* Display product name */}
                        
                        <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
                        <p><strong>Custom Preferences:</strong> {orderDetails.customPreferences}</p>
                        
                        {/* Dynamically render properties */}
                        {Object.entries(properties).map(([key, value]) => (
                            <p key={key}><strong>{key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:</strong> {value}</p>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No product information available.</p>
            )}

            {/* Back to Home Button */}
            <button onClick={handleBackToHome} className="btn btn-secondary">
                Back to Home
            </button>
        </div>
    );
};

export default CartPage;
