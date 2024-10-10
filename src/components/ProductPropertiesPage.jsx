import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPropertiesByProductId } from '../services/apiService'; 
import { createOrder } from '../services/apiService';
import axios from 'axios'; 
import '../styles/ProductPropertiesPage.css';
import { useUser } from '../UserContext';
const PropertyForm = () => {
    const location = useLocation(); // Correctly use useLocation inside the component
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    // Extracting values from location state
    const imageUrl = location.state?.imageUrl;
    const product = location.state?.product;
    const productId = product?.productId;
    const categoryName = product?.category?.categoryName;
    //const username = location.state?.username; // Getting username here
    const { username } = useUser();
    //console.log('proproperties',username);

    useEffect(() => {
        // if (username) {
        //     console.log('Username:', username);
        // } else {
        //     console.log('Username is not defined');
        // }
        
        // Fetch properties if productId and categoryName are valid
        if (productId && categoryName !== 'Office And Stationary') {
            getPropertiesByProductId(productId)
                .then(data => {
                    setProperties(data);
                })
                .catch(error => {
                    console.error('There was an error fetching the properties!', error);
                });
        }
    }, [productId, categoryName]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        const capturedProperties = {}; // Changed to avoid confusion with state variable

        // Populate capturedProperties from the fetched properties
        properties.forEach(property => {
            // Check if the form data has a value for this property
            if (data[property.propertyName]) {
                capturedProperties[property.propertyName] = data[property.propertyName];
            }
        });
    
        console.log("Captured Properties:", capturedProperties); // Log the captured properties
    
        // Construct order details DTO
        const orderDetails = {
            orderDetailsId:"00000000-0000-0000-0000-000000000000",
            productId,
            quantity: parseInt(data.quantity),
            properties: JSON.stringify(capturedProperties), // Stringify the properties
            customPreferences: data.customTextarea,
            username
        };
        console.log("Order Details:", orderDetails);

        try {
            const response = await createOrder(orderDetails); // Use your createOrder service
            console.log('Order created successfully:', response);
            setSuccessMessage('Order created successfully!'); // Set success message
            setTimeout(() => {
                navigate('/cart', { state: { orderDetails: response, product, imageUrl } });
            }, 2000);
        } catch (error) {
            console.error('Error creating order:', error);
            setErrorMessage('Error creating order. Please try again.'); // Set error message
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
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
            {/* Display error message with Bootstrap styles */}
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        </div>
    );
};

export default PropertyForm;
