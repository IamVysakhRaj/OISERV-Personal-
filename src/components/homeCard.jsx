//this is the common card layout of home page
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, imageUrl, navigateTo }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(navigateTo);
    };

    const styles = {
        card: {
            marginTop: '1rem',
            width: '1000px',
            height: '150px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            backgroundColor: 'rgb(13, 13, 13)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            overflow: 'hidden',
            cursor: 'pointer', // Make it clear that it's clickable
        },
        image: {
            width: '180px',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px 0 0 8px',
        },
        content: {
            marginLeft: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
        },
        cardTitle: {
            margin: '0 0 10px 0',
            fontSize: '1.5rem',
            color: 'white',
            marginLeft:'1rem'
        },
    };

    return (
        <div style={styles.card} onClick={handleClick}>
            {imageUrl && <img src={imageUrl} alt="Card image" style={styles.image} />}
            <div style={styles.content}>
                <h2 style={styles.cardTitle}>{title}</h2>
            </div>
        </div>
    );
};

export default Card;
