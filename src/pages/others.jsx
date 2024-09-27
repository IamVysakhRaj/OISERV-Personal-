import React, { useState } from 'react';
import query from '../assets/Images/query.jpg';
import '../styles/others.css';
import { submitAdditionalRequirement } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
const Others = () => {
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage(''); // Reset success message
        setErrorMessage('');   // Reset error message

        try {
            const result = await submitAdditionalRequirement(message);
            setSuccessMessage('Your requirement has been submitted successfully! and admin will contact you soon'); // Set success message
            setMessage(''); // Clear textarea after submission
            setTimeout(() => {
                navigate('/home'); // Change to your desired route
            }, 2000); 
        } catch (error) {
            setErrorMessage('There was an error submitting your requirement. Please try again.'); // Set error message
        }
    };

    return (
        <div className="others-container">
            <img src={query} alt="Others" className="others-image" />
            <form className="others-form" onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter Cab details/additional requirements..."
                    className="others-textarea"
                ></textarea>
                <button type="submit" className="others-submit-btn">
                    Submit
                </button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default Others; 