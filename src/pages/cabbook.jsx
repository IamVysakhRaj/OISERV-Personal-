import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Optional: Import Bootstrap JS (if needed for components like modals, dropdowns)
import '../styles/cabbooking.css'; // Custom styles
import { createCabRequest } from '../services/apiService';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const CabBookingForm = () => {
    const { username } = useUser();
    const [formData, setFormData] = useState({
        cabId: '00000000-0000-0000-0000-000000000000',
        pickup: '',
        dropoff: '',
        date: '',
        time: '',
        passengerCount: '',
        vehiclePreference: '',
        username: username
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await createCabRequest(formData);
            setMessage('Booking successful!');
            // Reset the form data
            setTimeout(() => {
                navigate('/cart'); // Simply redirect to the cart
            }, 2000); // Delay for 2 seconds before redirecting
            setFormData({
                cabId: '00000000-0000-0000-0000-000000000000',
                pickup: '',
                dropoff: '',
                date: '',
                time: '',
                passengerCount: '',
                vehiclePreference: '',
                username: username
            });
        } catch (error) {
            setMessage('Error occurred while booking cab. Please try again.');
        }
    };

    return (
        <div style={{
            backgroundImage: 'url("https://www.cychacks.com/wp-content/uploads/2019/09/Taxi-Booking.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="container mt-6">
                <h1 className="text-center text-white mb-4">Cab Booking Form</h1>
                
                <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow transparent-form">
                    <div className="mb-3">
                        <label htmlFor="pickup" className="form-label">From:</label>
                        <input
                            type="text"
                            id="pickup"
                            name="pickup"
                            required
                            placeholder="Enter pickup location"
                            value={formData.pickup}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dropoff" className="form-label">To:</label>
                        <input
                            type="text"
                            id="dropoff"
                            name="dropoff"
                            required
                            placeholder="Enter drop-off location"
                            value={formData.dropoff}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            required
                            value={formData.date}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="time" className="form-label">Time:</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            required
                            value={formData.time}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="passengerCount" className="form-label">Passenger Count:</label>
                        <input
                            type="number"
                            id="passengerCount"
                            name="passengerCount"
                            placeholder="Enter passenger count"
                            value={formData.passengerCount}
                            onChange={handleChange}
                            min="1"
                            max="10"
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="vehiclePreference" className="form-label">Vehicle Preference:</label>
                        <select
                            id="vehiclePreference"
                            name="vehiclePreference"
                            value={formData.vehiclePreference}
                            onChange={handleChange}
                            required
                            className="form-select"
                        >
                            <option value="">Select Vehicle</option>
                            <option value="sedan">Sedan</option>
                            <option value="suv">SUV</option>
                            <option value="minivan">Minivan</option>
                            <option value="luxury">Luxury</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 hover-effect">Book Now</button>

                </form>
            </div>
            {message && <div className="alert alert-info">{message}</div>}
        </div>
    );
};

export default CabBookingForm;
