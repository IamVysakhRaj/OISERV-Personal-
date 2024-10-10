import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/OrderPage.css';

const OrderPage = () => {
    const location = useLocation();
    const { product } = location.state || {};

    console.log('OrderPage received product:', product); // Add this line

    const [quantity, setQuantity] = useState('1');
    const [message, setMessage] = useState('');

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Ordered ${quantity} of ${product.productName} with message: ${message}`);
    };

    if (!product) {
        return <div>Product not found</div>;
    }
    // const { username } = useUser();
    // console.log(username);

    return (
        <div className="OrderPage">
            <form onSubmit={handleSubmit} className="OrderPage-form" style={{ backgroundImage: `url(${product.imageUrl})` }}>
                <h2>{product.productName}</h2>
                <label htmlFor="quantity">Quantity:</label>
                <select
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="OrderPage-select"
                >
                    {[...Array(5).keys()].map(num => (
                        <option key={num + 1} value={num + 1}>
                            {num + 1}
                        </option>
                    ))}
                </select>

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={handleMessageChange}
                    rows="4"
                    className="OrderPage-textarea"
                />

                <button type="submit" className="OrderPage-button">Submit</button>
            </form>
        </div>
    );
};

export default OrderPage;
