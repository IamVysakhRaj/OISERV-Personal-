
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/homeCard';
import '../styles/home.css';

import foodAndBeveragesImage from '../assets/Images/foodandbeverages.jpg';
import officeAndStationaryImage from '../assets/Images/officeandstationary.jpg';
import othersImage from '../assets/Images/others.jpg';
import cabbook from'../assets/Images/cabbooking.jpg';
import { useUser } from '../UserContext'; // Correctly import useUser

const Home = () => {
    const { username } = useParams(); // Get the username from URL params
    const { setUsername } = useUser(); // Get setUsername from context

    useEffect(() => {
        setUsername(username); // Set the username in context
    }, [username, setUsername]);

    return (
        <div className="home-container">
            <h2 className="home-title">How can I Help You?</h2>
            <h3>Welcome... You Are In {username}!</h3>
            <div className="card-container">
                <Card
                    title="FOOD & BEVERAGES"
                    imageUrl={foodAndBeveragesImage}
                    navigateTo="/food-and-beverages"
                />
                <Card
                    title="OFFICE & STATIONARY"
                    imageUrl={officeAndStationaryImage}
                    navigateTo="/Office&Stationary" 
                />
                <Card
                    title="CAB BOOKING"
                    imageUrl={cabbook}
                    navigateTo="/cabbooking"
                />
                <Card
                    title=" OTHERS"
                    imageUrl={othersImage}
                    navigateTo="/others"
                />
            </div>
        </div>
    );
};

export default Home;
