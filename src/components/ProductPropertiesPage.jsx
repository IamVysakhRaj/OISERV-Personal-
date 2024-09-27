import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPropertiesByProductId } from '../services/apiService'; 
import axios from 'axios'; // Import axios
import '../styles/ProductPropertiesPage.css';

const PropertyForm = () => {
    const [properties, setProperties] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const imageUrl = location.state?.imageUrl; // Retrieve imageUrl from navigation state
    const product = location.state?.product; // Retrieve product object from navigation state
    const productId = product?.productId; // Retrieve productId
    const categoryName = product?.category?.categoryName; // Retrieve category name
    const ProductName=product?.ProductName;

    useEffect(() => {
        // Check if productId is available and category is not 'stationary'
        if (productId && categoryName !== 'Office And Stationary') {
            // Fetch properties only if the category is not 'stationary'
            getPropertiesByProductId(productId)
                .then(data => {
                    setProperties(data);
                })
                .catch(error => {
                    console.error('There was an error fetching the properties!', error);
                });
        }
    }, [productId, categoryName]); // Add categoryName to dependency array

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Construct order details DTO
        const orderDetails = {
            productId: productId,
            quantity: parseInt(data.quantity), // Ensure quantity is a number
            properties: JSON.stringify({
                intensity: data.Intensity,
                coffee_type: data.coffee_type,
                sugar_preference: data.sugar_preference
            }),
            customPreferences: data.customTextarea
        };

        try {
            const response = await axios.post('https://localhost:7242/api/Products/CreateOrderDetails', orderDetails);
            console.log('Order created successfully:', response.data);
            alert('Order created successfully!');
            // Navigate to the cart or confirmation page
            navigate('/cart', { state: { orderDetails: response.data, product, imageUrl } });
        } catch (error) {
            console.error('Error creating order:', error);
            // You can show an error message to the user here if needed
        }
    };

    const renderInput = (property) => {
        const propertyValues = Array.isArray(property.propertyValues)
            ? property.propertyValues
            : JSON.parse(property.propertyValues || '[]');

        switch (property.propertyType) {
            case 'dropdown':
                return (
                    <select name={property.propertyName} className="form-select" required>
                        {propertyValues.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                );

            case 'radio':
                return (
                    <div>
                        {propertyValues.map((value, index) => (
                            <div key={index} className="form-check">
                                <input type="radio" className="form-check-input" name={property.propertyName} value={value} id={`${property.propertyName}-${index}`} required/>
                                <label className="form-check-label" htmlFor={`${property.propertyName}-${index}`}>{value}</label>
                            </div>
                        ))}
                    </div>
                );
            default:
                return (
                    <input type="text" name={property.propertyName} className="form-control" required />
                );
        }
    };

    return (
        <div className="container" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '25px', borderRadius: '8px', overflow: 'hidden' }}>
            <h1 className="mt-4 ProductPropertiesPage">Make Your Order</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="row">
                    {Array.isArray(properties) && properties.map((property, index) => (
                        <div key={index} className="col-md-6 mb-3 propertypage">
                            <label className="form-label">{property.propertyName}</label>
                            {renderInput(property)}
                        </div>
                    ))}
                </div>

                <div className="mb-3">
                    <label htmlFor="numberInput" className="form-label">Quantity:</label>
                    <input
                        type="number"
                        id="numberInput"
                        name="quantity"
                        max="5"
                        min="1"
                        className="form-control"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="customTextarea" className="form-label">Custom Preferences:</label>
                    <textarea
                        id="customTextarea"
                        name="customTextarea"
                        rows="5"
                        className="form-control"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit Order</button>
            </form>
        </div>
    );
};

export default PropertyForm;
