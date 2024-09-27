
import React from 'react';
import Card from '../components/homeCard';
import '../styles/Home.css';
//import ProductsList from './ProductsList';
import foodAndBeveragesImage from '../assets/Images/foodandbeverages.jpg';
import officeAndStationaryImage from '../assets/Images/officeandstationary.jpg';
import cabBookingImage from '../assets/Images/cabbooking.jpg';
import othersImage from '../assets/Images/others.jpg';

const Home = () => {
    return (
        <div className="home-container">
            <h2 className="home-title">How can I Help You?</h2>
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
                {/* enable this when cab booking functionalities */}
                {/* <Card
                    title="CAB BOOKING"
                    imageUrl={cabBookingImage}

                /> */}
                <Card
                    title="CAB BOOKING & OTHERS"
                    imageUrl={othersImage}
                    navigateTo="/others"
                />
            </div>
            
        </div>
    );
};

export default Home;
