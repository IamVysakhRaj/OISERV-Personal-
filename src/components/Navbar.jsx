import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/nav.css'
import { useUser } from '../UserContext';
import {  faHome } from '@fortawesome/free-solid-svg-icons'; // Import the user and other icons
const Navbar = () => {
    const { username } = useUser();
    return (
        <nav className='navbar-home'>
            <h1 style={styles.title}>OIServe</h1>
            <ul style={styles.navList}>
            {/* Welcome User */}
                <li style={styles.navItem}>
                    <Link to={`/${username}`} style={styles.link}>
                        <FontAwesomeIcon icon={faHome} style={styles.icon} /> 
                    </Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/cart" style={styles.link}>
                        <button className="btn btn-primary">My Orders</button>
                    </Link>
                </li>
               
            </ul>
        </nav>
    );
};

// Improved styles for the navbar
const styles = {
    title: {
        margin: '1.5rem',
        fontSize: '1.5rem',
        
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
        marginRight:10,
    },
    navItem: {
        margin: '0 15px',
    },
    link: {
        color: '#fff',
        transition: 'color 0.3s ease',
    },
    icon: {
        marginRight: '15px', // Space between icon and text
        fontSize: '1rem', // Adjust icon size
    },
};

// Applying hover effect
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.color = '#fff'; // Highlight color on hover
        });
        link.addEventListener('mouseout', () => {
            link.style.color = '#fff'; // Revert color on mouse out
        });
    });
});

export default Navbar;
